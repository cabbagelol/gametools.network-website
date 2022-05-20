import * as React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { GametoolsApi } from "../../api/GametoolsApi";
import { newTitles, graphGames } from "../../api/static";
import { Box } from "../Materials";

import { useMeasure } from "react-use";

ChartJS.register(
  zoomPlugin,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
);

interface GraphData {
  loading: boolean;
  error: boolean;
  stats: { [name: string]: any };
  gameName: string;
  platform: string;
  timeStamps: [string];
}

interface GlobalInfo {
  platform: string;
}

const borderPlugin = {
  id: "chartAreaBorder",
  beforeDraw(chart) {
    const {
      ctx,
      chartArea: { left, top, width, height },
    } = chart;
    if (chart.options.plugins.zoom.zoom.wheel.enabled) {
      ctx.save();
      ctx.strokeStyle = "red";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(left, top, width, height);
      ctx.restore();
    }
  },
};

function LineGraph(props: GraphData): React.ReactElement {
  if (!props.loading && !props.error) {
    const { t } = useTranslation();
    const chartRef = React.useRef(null);
    const time = props.timeStamps.map((e: string) => {
      const time = new Date(e);
      return time;
    });
    const data = newTitles.includes(props.gameName)
      ? {
          labels: time,
          datasets: [
            {
              label: t("stats.graph.all"),
              data: props.stats.soldierAmount,
              fill: false,
              borderColor: "rgba(75,192,192,0.2)",
              pointRadius: 0,
            },
            {
              label: t("stats.graph.dice"),
              data: props.stats.diceSoldierAmount,
              fill: false,
              borderColor: "#49297e",
              pointRadius: 0,
            },
            {
              label: t("stats.graph.community"),
              data: props.stats.communitySoldierAmount,
              fill: false,
              borderColor: "#195f08",
              pointRadius: 0,
            },
          ],
        }
      : {
          labels: time,
          datasets: [
            {
              label: "All players",
              data: props.stats.soldierAmount,
              fill: false,
              borderColor: "rgba(75,192,192,0.2)",
              pointRadius: 0,
            },
          ],
        };

    return (
      <div>
        <Line
          ref={chartRef}
          options={{
            hover: {
              intersect: false,
              mode: "nearest",
            },
            scales: {
              x: {
                type: "time",
                ticks: {
                  autoSkip: true,
                  autoSkipPadding: 50,
                  maxRotation: 0,
                },
                time: {
                  displayFormats: {
                    hour: "HH:mm, eee d LLL",
                  },
                },
              },
            },
            onClick() {
              const chart = chartRef.current;
              chart.options.plugins.zoom.zoom.wheel.enabled =
                !chart.options.plugins.zoom.zoom.wheel.enabled;
              chart.options.plugins.zoom.zoom.pinch.enabled =
                !chart.options.plugins.zoom.zoom.pinch.enabled;
              chart.update();
            },
            plugins: {
              tooltip: {
                mode: "nearest",
                intersect: false,
              },
              zoom: {
                limits: {
                  x: {
                    min: +new Date() - 604800000,
                    max: +new Date(),
                    minRange: 50000000,
                  },
                },
                pan: {
                  enabled: true,
                  mode: "x",
                },
                zoom: {
                  wheel: {
                    enabled: false,
                  },
                  pinch: {
                    enabled: false,
                  },
                  mode: "x",
                },
              },
            },
          }}
          style={{ height: "15rem" }}
          data={data}
          plugins={[borderPlugin]}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
}

function AllPlatformGraph(props: GraphData): React.ReactElement {
  if (!props.loading && !props.error) {
    const { t } = useTranslation();
    const chartRef = React.useRef(null);
    const time = props.timeStamps.map((e: string) => {
      const time = new Date(e);
      return time;
    });
    const data =
      props.gameName !== "bf2042"
        ? {
            labels: time,
            datasets: [
              {
                label: t("platforms.pc"),
                data: props.stats.pc.soldierAmount,
                fill: false,
                borderColor: "rgba(75,192,192,0.2)",
                pointRadius: 0,
              },
              {
                label: t("platforms.ps4"),
                data: props.stats.ps4.soldierAmount,
                fill: false,
                borderColor: "#49297e",
                pointRadius: 0,
              },
              {
                label: t("platforms.xboxone"),
                data: props.stats.xboxone.soldierAmount,
                fill: false,
                borderColor: "#195f08",
                pointRadius: 0,
              },
            ],
          }
        : {
            labels: time,
            datasets: [
              {
                label: t("platforms.global"),
                data: props.stats.soldierAmount,
                fill: false,
                borderColor: "rgba(75,192,192,0.2)",
                pointRadius: 0,
              },
            ],
          };

    return (
      <div>
        <Line
          ref={chartRef}
          options={{
            hover: {
              intersect: false,
              mode: "nearest",
            },
            scales: {
              x: {
                type: "time",
                ticks: {
                  autoSkip: true,
                  autoSkipPadding: 50,
                  maxRotation: 0,
                },
                time: {
                  displayFormats: {
                    hour: "HH:mm, eee d LLL",
                  },
                },
              },
            },
            onClick() {
              const chart = chartRef.current;
              chart.options.plugins.zoom.zoom.wheel.enabled =
                !chart.options.plugins.zoom.zoom.wheel.enabled;
              chart.options.plugins.zoom.zoom.pinch.enabled =
                !chart.options.plugins.zoom.zoom.pinch.enabled;
              chart.update();
            },
            plugins: {
              tooltip: {
                mode: "nearest",
                intersect: false,
              },
              zoom: {
                limits: {
                  x: {
                    min: +new Date() - 604800000,
                    max: +new Date(),
                    minRange: 50000000,
                  },
                },
                pan: {
                  enabled: true,
                  mode: "x",
                },
                zoom: {
                  wheel: {
                    enabled: false,
                  },
                  pinch: {
                    enabled: false,
                  },
                  mode: "x",
                },
              },
            },
          }}
          plugins={[borderPlugin]}
          style={{ height: "15rem" }}
          data={data}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
}

interface GameInfo {
  gameName: string;
  platform: string;
}

export function OldGameGraph(props: GameInfo): React.ReactElement {
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery(
    ["regions", "7", "all", props.gameName, props.platform],
    () =>
      GametoolsApi.graphs({
        game: props.gameName,
        days: "7",
        region: "all",
        platform: props.platform,
      }),
    { staleTime: Infinity, refetchOnWindowFocus: false },
  );
  const { t } = useTranslation();
  if (!loading && !error) {
    return (
      <Box>
        <h3>{t(`regions.all`)}</h3>
        {props.platform !== "all" ? (
          <LineGraph
            timeStamps={stats.timeStamps}
            loading={loading}
            error={error}
            platform={props.platform}
            stats={stats}
            gameName={props.gameName}
          />
        ) : (
          <AllPlatformGraph
            timeStamps={stats.timeStamps}
            loading={loading}
            error={error}
            platform={props.platform}
            stats={stats}
            gameName={props.gameName}
          />
        )}
      </Box>
    );
  } else {
    return <h3>{t("loading")}</h3>;
  }
}

export function Graph(props: GameInfo): React.ReactElement {
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery(
    ["regions", "7", "multiple", props.gameName, props.platform],
    () =>
      GametoolsApi.graphs({
        game: props.gameName,
        days: "7",
        region: "multiple",
        platform: props.platform,
      }),
    { staleTime: Infinity, refetchOnWindowFocus: false },
  );
  const { t } = useTranslation();
  if (!loading && !error) {
    return (
      <>
        {Object.keys(stats).map((key: string, index: number) => {
          {
            if (["timeStamps", "startTime", "endTime"].includes(key)) {
              return <></>;
            } else {
              return (
                <Box key={index}>
                  <h3>{t(`regions.${key.toLowerCase()}`)}</h3>
                  {props.platform !== "all" ? (
                    <LineGraph
                      timeStamps={stats.timeStamps}
                      loading={loading}
                      error={error}
                      platform={props.platform}
                      stats={stats[key]}
                      gameName={props.gameName}
                    />
                  ) : (
                    <AllPlatformGraph
                      timeStamps={stats.timeStamps}
                      loading={loading}
                      error={error}
                      platform={props.platform}
                      stats={stats[key]}
                      gameName={props.gameName}
                    />
                  )}
                </Box>
              );
            }
          }
        })}
      </>
    );
  } else {
    return (
      <Box>
        <h3>{t("loading")}</h3>
      </Box>
    );
  }
}

function GlobalLineGraph(props: GraphData): React.ReactElement {
  const [graphRef, { width }] = useMeasure();
  const chartRef = React.useRef(null);
  const { t } = useTranslation();
  if (!props.loading && !props.error) {
    const time = props.stats.timeStamps.map((e: string) => {
      const time = new Date(e);
      return time;
    });
    const games = graphGames[props.platform].filter((e: string) => {
      if (e !== "bfglobal") {
        return e;
      }
    });
    const colors = [
      "#4bc0c0",
      "#49297e",
      "#195f08",
      "#003fc5",
      "#ae08a7",
      "#ae0842",
      "#829a00",
      "#9a5d00",
      "#009a96",
      "#00609a",
      "#4b009a",
      "#439a00",
      "#004b9f",
    ];
    const data = {
      labels: time,
      datasets: games.map((e: string, index: number) => {
        let gameName = e;
        const gameStuff = e.split(".");
        if (gameStuff[0] == "bf2") {
          gameName = gameStuff[1];
        }
        if (width > 500) {
          return {
            label: t(`games.${e}`),
            data: props.stats[gameName],
            fill: false,
            borderColor: colors[index],
            pointRadius: 0,
          };
        }
        return {
          label: e,
          data: props.stats[gameName],
          fill: false,
          borderColor: colors[index],
          pointRadius: 0,
        };
      }),
    };

    return (
      <div ref={graphRef}>
        {width > 380 ? (
          <Line
            ref={chartRef}
            options={{
              hover: {
                intersect: false,
                mode: "nearest",
              },
              scales: {
                x: {
                  type: "time",
                  ticks: {
                    autoSkip: true,
                    autoSkipPadding: 50,
                    maxRotation: 0,
                  },
                  time: {
                    displayFormats: {
                      hour: "HH:mm, eee d LLL",
                    },
                  },
                },
              },
              onClick() {
                const chart = chartRef.current;
                chart.options.plugins.zoom.zoom.wheel.enabled =
                  !chart.options.plugins.zoom.zoom.wheel.enabled;
                chart.options.plugins.zoom.zoom.pinch.enabled =
                  !chart.options.plugins.zoom.zoom.pinch.enabled;
                chart.update();
              },
              plugins: {
                tooltip: {
                  mode: "nearest",
                  intersect: false,
                },
                zoom: {
                  limits: {
                    x: {
                      min: +new Date() - 604800000,
                      max: +new Date(),
                      minRange: 50000000,
                    },
                  },
                  pan: {
                    enabled: true,
                    mode: "x",
                  },
                  zoom: {
                    wheel: {
                      enabled: false,
                    },
                    pinch: {
                      enabled: false,
                    },
                    mode: "x",
                  },
                },
              },
            }}
            plugins={[borderPlugin]}
            style={{ height: "20rem" }}
            data={data}
          />
        ) : (
          <Line
            ref={chartRef}
            options={{
              hover: {
                intersect: false,
                mode: "nearest",
              },
              onClick() {
                const chart = chartRef.current;
                chart.options.plugins.zoom.zoom.wheel.enabled =
                  !chart.options.plugins.zoom.zoom.wheel.enabled;
                chart.options.plugins.zoom.zoom.pinch.enabled =
                  !chart.options.plugins.zoom.zoom.pinch.enabled;
                chart.update();
              },
              plugins: {
                legend: { display: false },
                tooltip: {
                  mode: "nearest",
                  intersect: false,
                },
                zoom: {
                  limits: {
                    x: {
                      min: +new Date() - 604800000,
                      max: +new Date(),
                      minRange: 50000000,
                    },
                  },
                  pan: {
                    enabled: true,
                    mode: "x",
                  },
                  zoom: {
                    wheel: {
                      enabled: false,
                    },
                    pinch: {
                      enabled: false,
                    },
                    mode: "x",
                  },
                },
              },
            }}
            plugins={[borderPlugin]}
            style={{ height: "0rem" }}
            data={data}
          />
        )}
      </div>
    );
  } else {
    return (
      <Box>
        <h3>{t("loading")}</h3>
      </Box>
    );
  }
}

export function GlobalGraph(props: GlobalInfo): React.ReactElement {
  const platform = props.platform == "all" ? "global" : props.platform;
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery(
    ["globalRegions", "7", props.platform],
    () =>
      GametoolsApi.graphs({
        game: "bfglobal",
        days: "7",
        region: "all",
        platform: platform,
      }),
    { staleTime: Infinity, refetchOnWindowFocus: false },
  );

  return (
    <Box>
      <GlobalLineGraph
        timeStamps={["none"]}
        loading={loading}
        error={error}
        stats={stats}
        gameName="bfglobal"
        platform={props.platform}
      />
    </Box>
  );
}
