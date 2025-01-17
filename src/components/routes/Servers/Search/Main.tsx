import * as React from "react";
import "../../../../locales/config";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../../../assets/scss/App.scss";
import { BF2042Player, GametoolsApi } from "../../../../api/GametoolsApi";
import { useQuery } from "@tanstack/react-query";
import {
  AltText,
  SearchBox,
  Container,
  BigSelectSecondary,
  SelectPrimary,
  Align,
  Bf2042SearchBox,
  Bf2042BigSelectSecondary,
  Alignbf2042Search,
  BackButton,
  SmallSearchBox,
  Box,
  InputItem,
  BigButtonSecondaryBox,
  CheckItem,
  SmallButtonSecondary,
} from "../../../Materials";
import { getLanguage } from "../../../../locales/config";
import {
  extraGames,
  frostbite3,
  frostbiteJoinGames,
  newGen,
  newTitles,
  oldJoinGames,
  playerFilterGames,
  supportedGames,
} from "../../../../api/static";
import { Results } from "./Results";
import { useLocalStorage } from "react-use";

const AltDescription = styled.p`
  ${AltText}
  margin-left: 24px;
`;

const Title = styled.h2`
  margin-top: 2rem;
`;

const ServerPageColumn = styled.div`
  @media screen and (min-width: 1000px) {
    display: flex;
    flex-flow: no-wrap;
    align-items: flex-start;
  }
`;

const ServerPageFilters = styled.div`
  @media screen and (max-width: 1000px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const ServerPageFilterRow = styled.div`
  min-width: 8rem;
  margin-right: 1rem;
`;

const ServerPageRow = styled.div`
  @media screen and (min-width: 1300px) {
    flex: 0;
    min-width: 922px;
  }
  @media screen and (max-width: 1300px) {
    flex: 100%;
  }
`;

const Arrow = styled.i`
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  margin-left: 6px;
`;

const RemoveIcon = styled.b`
  margin-right: 8px;
  cursor: pointer;
`;

function DropdownArrow(props: {
  item: string;
  dropdownOpen: {
    [string: string]: boolean;
  };
  setDropdownOpen: React.Dispatch<
    React.SetStateAction<{
      [string: string]: boolean;
    }>
  >;
}) {
  const { item, dropdownOpen, setDropdownOpen } = props;
  return (
    <Arrow
      onClick={() => {
        const current = { ...dropdownOpen };
        current[item] = !current[item];
        setDropdownOpen(current);
      }}
      style={{
        transform: dropdownOpen[item] ? "rotate(-135deg)" : "rotate(45deg)",
        webkitTransform: dropdownOpen[item]
          ? "rotate(-135deg)"
          : "rotate(45deg)",
        marginBottom: dropdownOpen[item] ? "0" : "2.44px",
      }}
    />
  );
}

function ServerSort(props: {
  sortType: string;
  setSortType: (arg0: string) => void;
}) {
  const { t } = useTranslation();
  return (
    <SelectPrimary
      style={{
        marginLeft: "1rem",
        marginTop: "-0.1rem",
      }}
      value={props.sortType}
      onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
        props.setSortType(ev.target.value)
      }
    >
      <option value="prefix">{t("servers.sort.serverName")}</option>
      <option value="-playerAmount">{t("servers.sort.playerAmount")}</option>
      <option value="-maxPlayers">{t("servers.sort.maxPlayers")}</option>
    </SelectPrimary>
  );
}

function ServerOwnerSearch(props: {
  ownerList: BF2042Player[];
  setOwnerList: React.Dispatch<React.SetStateAction<BF2042Player[]>>;
}): React.ReactElement {
  const { ownerList, setOwnerList } = props;
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const searchBox: React.MutableRefObject<HTMLInputElement> = React.useRef();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addItem();
    }
  };

  const addItem = () => {
    if (
      autocompleteResult?.results == undefined ||
      autocompleteResult?.results.length <= 0
    ) {
      return;
    }
    const firstResult = autocompleteResult?.results[0];
    if (
      !ownerList.some(
        (el) =>
          el?.personaId === firstResult?.personaId &&
          el?.platform === firstResult?.platform,
      )
    ) {
      setOwnerList((old) => [...old, firstResult]);
    }
    setSearchTerm("");
  };

  const removeItem = (item: BF2042Player) => {
    setOwnerList((old) =>
      old.filter(
        (el) =>
          el?.personaId !== item?.personaId || el?.platform !== item?.platform,
      ),
    );
  };

  const { data: autocompleteResult } = useQuery(
    ["serverOwner" + searchTerm],
    () =>
      GametoolsApi.bf2042PlayerSearch({
        name: searchTerm,
      }),
  );

  return (
    <>
      <Align>
        <SmallSearchBox
          ref={searchBox}
          placeholder={t(`serverSearch.serverOwner.main`)}
          value={searchTerm}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
            setSearchTerm(ev.target.value)
          }
          style={{ marginRight: "10px", marginLeft: "-10px", marginBottom: 0 }}
          onKeyDown={handleKeyDown}
        />
        {/* <DropDownAutocomplete
          autocompleteResult={autocompleteResult}
          searchTerm={searchTerm}
          searchBoxRef={searchBox}
          callback={(val) => {
            setSearchTerm(val);
          }}
          style={{ position: "relative" }}
        /> */}
        <SmallButtonSecondary
          style={{ marginRight: ".5rem", marginBottom: 0 }}
          onClick={addItem}
        >
          {t("serverSearch.serverOwner.add")}
        </SmallButtonSecondary>
      </Align>
      {ownerList.map((value, index) => {
        return (
          <p
            key={index}
            style={{
              marginTop: "8px",
              marginLeft: "2px",
              marginBottom: "0px",
            }}
          >
            <RemoveIcon onClick={() => removeItem(value)}>&#10006;</RemoveIcon>
            {value?.name}
          </p>
        );
      })}
    </>
  );
}

function Main(): React.ReactElement {
  const [width, setWidth] = React.useState<number>(window.innerWidth);
  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [gameName, setGameNameItem] = useLocalStorage<string>(
    "serverSearch_game",
    "bf2042",
  );
  const [platform, setPlatform] = useLocalStorage<string>(
    "serverSearch_platform",
    "allPlatforms",
  );
  const [limit, setLimit] = useLocalStorage<string>("serverSearch_limit", "10");
  const [searchType, setSearchType] = React.useState<string>("experiencename");
  const [sortType, setSortType] = React.useState<string>("-prefix");
  const [dropdownOpen, setDropdownOpen] = React.useState<{
    [string: string]: boolean;
  }>({});
  const [hideSideBar, setHideSidebar] = useLocalStorage<boolean>(
    "serverSearch_hideSidebar",
    false,
  );

  const [regionFilter, setRegionFilter] = React.useState<string[]>(["all"]);
  const [gamemodeFilter, setGamemodeFilter] = React.useState<string[]>([]);
  const [mapFilter, setMapFilter] = React.useState<string[]>([]);
  const [playerFilter, setPlayerFilter] = React.useState<string[]>([]);
  const [isPasswordProtected, setIsPasswordProtected] =
    React.useState<string>("");
  const [bf2042OwnerList, setbf2042OwnerList] = React.useState<BF2042Player[]>(
    [],
  );
  function setGameName(newGame: string) {
    // reset other filters when changing gamename
    setGamemodeFilter([]);
    setPlayerFilter([]);
    setMapFilter([]);
    setRegionFilter([]);
    setIsPasswordProtected("");
    setbf2042OwnerList([]);

    setGameNameItem(newGame);
  }

  const history = useNavigate();
  // get info from query ?search &game
  const query = new URLSearchParams(useLocation().search);
  const nameQuery = query.get("search");
  const gameQuery = query.get("game");
  const regionQuery = query.get("region");
  const platformQuery = query.get("platform");
  const limitQuery = query.get("limit");
  const typeQuery = query.get("searchtype");
  const gamemodeQuery = query.get("gamemode");
  const mapQuery = query.get("map");
  const playerFilterQuery = query.get("player_filter");
  const isPasswordProtectedQuery = query.get("is_password_protected");
  const bf2042OwnerListQuery = query.get("bf2042_owner_list");
  const regionKey = gameName === "battlebit" ? "battlebitRegions" : "regions";
  React.useState(() => {
    nameQuery !== null ? setSearchTerm(nameQuery) : null;
    gameQuery !== null ? setGameName(gameQuery) : null;
    regionQuery !== null ? setRegionFilter(regionQuery.split(",")) : null;
    gamemodeQuery !== null ? setGamemodeFilter(gamemodeQuery.split(",")) : null;
    playerFilterQuery !== null
      ? setPlayerFilter(playerFilterQuery.split(","))
      : null;
    mapQuery !== null ? setMapFilter(mapQuery.split(",")) : null;
    isPasswordProtectedQuery !== null
      ? setIsPasswordProtected(isPasswordProtectedQuery)
      : null;
    bf2042OwnerListQuery !== null
      ? setbf2042OwnerList(JSON.parse(bf2042OwnerListQuery))
      : null;
    platformQuery !== null ? setPlatform(platformQuery) : null;
    limitQuery !== null ? setLimit(limitQuery) : null;
    typeQuery !== null ? setSearchType(typeQuery) : null;
  });

  // change top to query
  React.useEffect(() => {
    const params = new URLSearchParams();
    searchTerm.length > 0
      ? params.append("search", searchTerm)
      : params.delete("search");
    gameName.length > 0
      ? params.append("game", gameName)
      : params.delete("game");
    isPasswordProtected != ""
      ? params.append("is_password_protected", isPasswordProtected.toString())
      : params.delete("is_password_protected");
    regionFilter.length > 0
      ? params.append("region", regionFilter.join(","))
      : params.delete("region");
    gamemodeFilter.length > 0
      ? params.append("gamemode", gamemodeFilter.join(","))
      : params.delete("gamemode");
    mapFilter.length > 0
      ? params.append("map", mapFilter.join(","))
      : params.delete("map");
    playerFilter.length > 0
      ? params.append("player_filter", playerFilter.join(","))
      : params.delete("player_filter");
    bf2042OwnerList.length > 0
      ? params.append("bf2042_owner_list", JSON.stringify(bf2042OwnerList))
      : params.delete("bf2042_owner_list");
    platform.length > 0
      ? params.append("platform", platform)
      : params.delete("platform");
    limit.length > 0 ? params.append("limit", limit) : params.delete("limit");
    searchType.length > 0
      ? params.append("searchtype", searchType)
      : params.delete("searchtype");
    history({ search: params.toString() });
  }, [
    searchTerm,
    gameName,
    regionFilter,
    gamemodeFilter,
    mapFilter,
    isPasswordProtected,
    playerFilter,
    bf2042OwnerList,
    platform,
    limit,
    searchType,
    history,
  ]);

  React.useEffect(() => {
    if (
      regionFilter.length > 0 ||
      gamemodeFilter.length > 0 ||
      playerFilter.length > 0 ||
      mapFilter.length > 0 ||
      isPasswordProtected != "" ||
      bf2042OwnerList.length > 0
    ) {
      setHideSidebar(false);
    }
  }, []);

  const extraQueries = {};
  if (gamemodeFilter.length > 0) {
    if (gameName === "bf2042") {
      extraQueries["modes"] = gamemodeFilter.join(";");
    }
    extraQueries["gamemode_filters"] = gamemodeFilter.join(",");
  }
  if (playerFilter.length > 0) {
    extraQueries["player_filters"] = playerFilter.join(",");
  }
  if (mapFilter.length > 0) {
    if (gameName === "bf2042") {
      extraQueries["maps"] = mapFilter.join(";");
    }
    extraQueries["map_filters"] = mapFilter.join(",");
  }
  if (isPasswordProtected != "") {
    if (gameName === "bf2042") {
      extraQueries["has_password"] = isPasswordProtected === "true";
    }
    extraQueries["is_password_protected"] = isPasswordProtected === "true";
  }
  if (bf2042OwnerList.length > 0) {
    extraQueries["owners"] = JSON.stringify(
      bf2042OwnerList.map((val) => {
        return {
          personaid: val.personaId,
          nucleusid: val.nucleusId,
          platform: val.platform,
        };
      }),
    );
  }

  const { t } = useTranslation();
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery(
    [
      "servers" +
        gameName +
        searchTerm +
        searchType +
        regionFilter +
        platform +
        limit +
        JSON.stringify(extraQueries),
    ],
    () =>
      GametoolsApi.serverSearch({
        game: gameName,
        searchTerm: searchTerm,
        lang: getLanguage(),
        regions: regionFilter.length <= 0 ? ["all"] : regionFilter,
        searchType: searchType,
        platform: platform,
        limit: limit,
        extraQueries,
      }),
  );
  return (
    <Container>
      <BackButton text={t("serverSearch.back")} location="/" />
      <Align>
        <h2>{t("serverSearch.serverInfo")}</h2>
        <AltDescription>{t("serverSearch.description")}</AltDescription>
      </Align>
      <Align>
        {gameName === "bf2042" ? (
          <Alignbf2042Search>
            <Bf2042SearchBox
              placeholder={t(`serverSearch.searchPlaceholder.${searchType}`)}
              value={searchTerm}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                setSearchTerm(ev.target.value)
              }
            />
            <Bf2042BigSelectSecondary
              value={searchType}
              onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
                setSearchType(ev.target.value)
              }
            >
              <option value="servername">{t("serverSearch.type.name")}</option>
              <option value="experiencename">
                {t("serverSearch.type.playground")}
              </option>
            </Bf2042BigSelectSecondary>
          </Alignbf2042Search>
        ) : (
          <SearchBox
            placeholder={t(`serverSearch.searchPlaceholder.${searchType}`)}
            value={searchTerm}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setSearchTerm(ev.target.value)
            }
          />
        )}
        <BigSelectSecondary
          value={gameName}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
            setGameName(ev.target.value)
          }
        >
          {supportedGames.map((value, index) => {
            return (
              <option key={index} value={value}>
                {t(`games.${value}`)}
              </option>
            );
          })}
        </BigSelectSecondary>
        <BigSelectSecondary
          disabled={
            !frostbite3.includes(gameName) && !extraGames.includes(gameName)
          }
          value={limit}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
            setLimit(ev.target.value)
          }
        >
          {Object.keys(t("limit", { returnObjects: true })).map(
            (key, index) => {
              return (
                <option key={index} value={key}>
                  {t(`limit.${key}`)}
                </option>
              );
            },
          )}
        </BigSelectSecondary>
        <BigSelectSecondary
          disabled={!frostbite3.includes(gameName)}
          value={platform}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
            setPlatform(ev.target.value)
          }
        >
          {gameName == "bf2042" && (
            <option value="allPlatforms">{t("platforms.all")}</option>
          )}
          <option value="pc">{t("platforms.pc")}</option>
          <option value="ps4">{t("platforms.ps4")}</option>
          <option value="xboxone">{t("platforms.xboxone")}</option>
          {gameName == "bf2042" && (
            <>
              <option value="ps5">{t("platforms.ps5")}</option>
              <option value="xboxseries">{t("platforms.xboxseries")}</option>
            </>
          )}
        </BigSelectSecondary>
        {/* <BigButtonSecondary type="submit">{t("serverSearch.search")} <RightArrow/></BigButtonSecondary> */}
      </Align>
      {oldJoinGames.includes(gameName) ||
        (frostbiteJoinGames.includes(gameName) && (
          <p
            style={{
              marginTop: "-0.5rem",
              marginBottom: "0.7rem",
              marginLeft: "0.5rem",
            }}
          >
            <Trans i18nKey="servers.joinme.info">
              <a href="https://joinme.click/download">
                https://joinme.click/download
              </a>
            </Trans>
          </p>
        ))}
      <Align>
        <Title
          style={{
            marginLeft: "0.5rem",
            marginTop: !newTitles.includes(gameName) ? "-0.4rem" : "0rem",
            marginBottom: !newTitles.includes(gameName) ? "0.8rem" : "1.2rem",
          }}
        >
          {t("serverSearch.results")}
        </Title>
        <ServerSort sortType={sortType} setSortType={setSortType} />
        {(frostbite3.includes(gameName) || extraGames.includes(gameName)) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              marginLeft: "5px",
            }}
          >
            <label className="switch">
              <input
                checked={!hideSideBar}
                onClick={() => {
                  setHideSidebar(!hideSideBar);
                }}
                type="checkbox"
              />
              <span className="slider round"></span>
            </label>
            <p style={{ marginLeft: ".4rem", marginTop: "8px" }}>
              {t("serverSearch.showFilters")}
            </p>
          </div>
        )}
      </Align>
      <ServerPageColumn>
        {(frostbite3.includes(gameName) || extraGames.includes(gameName)) &&
          !hideSideBar && (
            <div>
              <Box
                style={{
                  minWidth: "240px",
                }}
                innerStyle={{ maxHeight: width >= 1000 ? "600px" : "300px" }}
              >
                <ServerPageFilters>
                  <ServerPageFilterRow>
                    <h2 style={{ marginBottom: "0.4rem" }}>
                      {t("serverSearch.region")}
                      <DropdownArrow
                        item={"region"}
                        dropdownOpen={dropdownOpen}
                        setDropdownOpen={setDropdownOpen}
                      />
                    </h2>
                    {!dropdownOpen["region"] &&
                      Object.keys(t(regionKey, { returnObjects: true })).map(
                        (key, index) => {
                          if (key === "all") {
                            return;
                          }
                          return (
                            <CheckItem
                              key={index}
                              item={key}
                              currrentItems={regionFilter}
                              callback={(e: {
                                target: { value: string; checked: boolean };
                              }) => {
                                if (e.target.checked) {
                                  let oldArray = [...regionFilter];
                                  if (regionFilter.includes("all")) {
                                    oldArray = [];
                                  }
                                  setRegionFilter([
                                    ...oldArray,
                                    e.target.value,
                                  ]);
                                } else {
                                  setRegionFilter((oldArray) => [
                                    ...oldArray.filter(
                                      (item) => item !== e.target.value,
                                    ),
                                  ]);
                                }
                              }}
                              name={t(`${regionKey}.${key}`)}
                            />
                          );
                        },
                      )}
                  </ServerPageFilterRow>
                  {gameName === "bf2042" && (
                    <ServerPageFilterRow>
                      <h2 style={{ marginBottom: "0.4rem" }}>
                        {t("serverSearch.serverOwner.main")}
                        <DropdownArrow
                          item={"serverOwner"}
                          dropdownOpen={dropdownOpen}
                          setDropdownOpen={setDropdownOpen}
                        />
                      </h2>
                      {!dropdownOpen["serverOwner"] && (
                        <ServerOwnerSearch
                          ownerList={bf2042OwnerList}
                          setOwnerList={setbf2042OwnerList}
                        />
                      )}
                    </ServerPageFilterRow>
                  )}
                  {playerFilterGames.includes(gameName) && (
                    <ServerPageFilterRow>
                      <h2 style={{ marginBottom: "0.4rem" }}>
                        {t("serverSearch.playerFilter")}
                        <DropdownArrow
                          item={"playerFilter"}
                          dropdownOpen={dropdownOpen}
                          setDropdownOpen={setDropdownOpen}
                        />
                      </h2>
                      {!dropdownOpen["playerFilter"] &&
                        Object.keys(
                          t("servers.frostbite3.playerFilter", {
                            returnObjects: true,
                          }),
                        ).map((key, index) => {
                          return (
                            <CheckItem
                              key={index}
                              item={key}
                              currrentItems={playerFilter}
                              callback={(e: {
                                target: {
                                  checked: boolean;
                                  value: string;
                                };
                              }) => {
                                if (e.target.checked) {
                                  setPlayerFilter((oldArray) => [
                                    ...oldArray,
                                    e.target.value,
                                  ]);
                                } else {
                                  setPlayerFilter((oldArray) => [
                                    ...oldArray.filter(
                                      (item) => item !== e.target.value,
                                    ),
                                  ]);
                                }
                              }}
                              name={t(`servers.frostbite3.playerFilter.${key}`)}
                            />
                          );
                        })}
                    </ServerPageFilterRow>
                  )}
                  {(gameName === "bf2042" || gameName === "bf1") && (
                    <ServerPageFilterRow>
                      <h2 style={{ marginBottom: "0.4rem" }}>
                        {t("serverSearch.gamemode")}
                        <DropdownArrow
                          item={"gamemode"}
                          dropdownOpen={dropdownOpen}
                          setDropdownOpen={setDropdownOpen}
                        />
                      </h2>
                      {!dropdownOpen["gamemode"] &&
                        Object.keys(
                          t(`servers.${gameName}.gamemodes`, {
                            returnObjects: true,
                          }),
                        ).map((key, index) => {
                          return (
                            <CheckItem
                              key={index}
                              item={key}
                              currrentItems={gamemodeFilter}
                              callback={(e: {
                                target: { value: string; checked: boolean };
                              }) => {
                                if (e.target.checked) {
                                  setGamemodeFilter((oldArray) => [
                                    ...oldArray,
                                    e.target.value,
                                  ]);
                                } else {
                                  setGamemodeFilter((oldArray) => [
                                    ...oldArray.filter(
                                      (item) => item !== e.target.value,
                                    ),
                                  ]);
                                }
                              }}
                              name={t(`servers.${gameName}.gamemodes.${key}`)}
                            />
                          );
                        })}
                    </ServerPageFilterRow>
                  )}
                  {(gameName === "bf2042" || newTitles.includes(gameName)) && (
                    <ServerPageFilterRow>
                      <h2 style={{ marginBottom: "0.4rem" }}>
                        {t("serverSearch.map")}
                        <DropdownArrow
                          item={"map"}
                          dropdownOpen={dropdownOpen}
                          setDropdownOpen={setDropdownOpen}
                        />
                      </h2>
                      {!dropdownOpen["map"] &&
                        Object.keys(
                          t(`servers.${gameName}.maps`, {
                            returnObjects: true,
                          }),
                        ).map((key, index) => {
                          return (
                            <CheckItem
                              key={index}
                              item={key}
                              currrentItems={mapFilter}
                              callback={(e: {
                                target: { value: string; checked: boolean };
                              }) => {
                                if (e.target.checked) {
                                  setMapFilter((oldArray) => [
                                    ...oldArray,
                                    e.target.value,
                                  ]);
                                } else {
                                  setMapFilter((oldArray) => [
                                    ...oldArray.filter(
                                      (item) => item !== e.target.value,
                                    ),
                                  ]);
                                }
                              }}
                              name={t(`servers.${gameName}.maps.${key}`)}
                            />
                          );
                        })}
                    </ServerPageFilterRow>
                  )}
                  {frostbite3.includes(gameName) && (
                    <ServerPageFilterRow>
                      <h2 style={{ marginBottom: "0.4rem" }}>
                        {t("servers.password")}
                        <DropdownArrow
                          item={"password"}
                          dropdownOpen={dropdownOpen}
                          setDropdownOpen={setDropdownOpen}
                        />
                      </h2>
                      {!dropdownOpen["password"] &&
                        Object.entries({
                          "": "case.none",
                          true: "case.on",
                          false: "case.off",
                        }).map(([k, v], index) => {
                          return (
                            <InputItem
                              key={index}
                              item={k}
                              currrentItem={isPasswordProtected}
                              callback={(e: {
                                target: { value: React.SetStateAction<string> };
                              }) => setIsPasswordProtected(e.target.value)}
                              name={t(v)}
                            />
                          );
                        })}
                    </ServerPageFilterRow>
                  )}
                </ServerPageFilters>
              </Box>
            </div>
          )}
        <ServerPageRow>
          <Results
            mainPage={false}
            game={gameName}
            loading={loading}
            stats={stats}
            error={error}
            sortType={sortType}
            spacingStyle={{ maxWidth: "99rem" }}
          />
        </ServerPageRow>
      </ServerPageColumn>
    </Container>
  );
}

const AlignHomeServers = styled(Align)`
  margin-top: 1.1rem;
  @media screen and (max-width: 530px) {
    width: 100%;
  }
`;

export function ServerSearch(): React.ReactElement {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [gameName, setGameName] = useLocalStorage<string>(
    "serverSearch_game",
    "bf2042",
  );
  const [platform, setPlatform] = useLocalStorage<string>(
    "serverSearch_platform",
    "allPlatforms",
  );
  const [regionFilter, setRegionFilter] = React.useState<string[]>(["all"]);
  const regionKey = gameName === "battlebit" ? "battlebitRegions" : "regions";

  const { t } = useTranslation();
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery(
    [
      "servers" +
        gameName +
        searchTerm +
        "servername" +
        regionFilter +
        platform +
        "4",
    ],
    () =>
      GametoolsApi.serverSearch({
        game: gameName,
        searchTerm: searchTerm,
        lang: getLanguage(),
        searchType: "servername",
        regions: regionFilter,
        platform: platform,
        limit: "4",
      }),
  );
  return (
    <>
      <AlignHomeServers>
        <h2 style={{ marginTop: 0, marginBottom: "1.2rem" }}>
          {t("serverSearch.servers")}
        </h2>
        <SelectPrimary
          style={{ marginLeft: "1rem" }}
          value={gameName}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void => {
            setGameName(ev.target.value);
            setPlatform("pc");
            setRegionFilter(["all"]);
          }}
        >
          {supportedGames.map((value, index) => {
            return (
              <option key={index} value={value}>
                {t(`games.${value}`)}
              </option>
            );
          })}
        </SelectPrimary>
        <SmallSearchBox
          style={{ marginLeft: "1rem", width: "16rem" }}
          placeholder={t(`serverSearch.searchPlaceholder.servername`)}
          value={searchTerm}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
            setSearchTerm(ev.target.value)
          }
        />
        {oldJoinGames.includes(gameName) ||
          (frostbiteJoinGames.includes(gameName) && (
            <p style={{ marginTop: 0, marginBottom: "1.1rem" }}>
              <Trans i18nKey="servers.joinme.smallinfo">
                <a href="https://joinme.click/download">
                  https://joinme.click/download
                </a>
              </Trans>
            </p>
          ))}
      </AlignHomeServers>
      <ServerPageColumn>
        <ServerPageRow>
          <Results
            game={gameName}
            loading={loading}
            stats={stats}
            error={error}
            mainPage={true}
            sortType={"-prefix"}
            spacingStyle={{ maxWidth: "99rem" }}
          />
        </ServerPageRow>
        <Box
          style={{ minWidth: "240px", maxWidth: "20rem" }}
          innerStyle={{ maxHeight: "510px" }}
        >
          <ServerPageFilters>
            <ServerPageFilterRow>
              <h2 style={{ marginBottom: "0.4rem" }}>
                {t("serverSearch.platform")}
              </h2>
              <InputItem
                item={"allPlatforms"}
                currrentItem={platform}
                callback={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setPlatform(e.target.value)}
                name={t("platforms.all")}
                disabled={!newGen.includes(gameName)}
              />
              <InputItem
                item={"pc"}
                currrentItem={platform}
                callback={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setPlatform(e.target.value)}
                name={t("platforms.pc")}
              />
              <InputItem
                item={"ps4"}
                currrentItem={platform}
                callback={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setPlatform(e.target.value)}
                name={t("platforms.ps4")}
                disabled={!frostbite3.includes(gameName)}
              />
              <InputItem
                item={"xboxone"}
                currrentItem={platform}
                callback={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setPlatform(e.target.value)}
                name={t("platforms.xboxone")}
                disabled={!frostbite3.includes(gameName)}
              />
              <InputItem
                item={"ps5"}
                currrentItem={platform}
                callback={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setPlatform(e.target.value)}
                name={t("platforms.ps5")}
                disabled={!newGen.includes(gameName)}
              />
              <InputItem
                item={"xboxseries"}
                currrentItem={platform}
                callback={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setPlatform(e.target.value)}
                name={t("platforms.xboxseries")}
                disabled={!newGen.includes(gameName)}
              />
            </ServerPageFilterRow>
            <ServerPageFilterRow>
              <h2 style={{ marginBottom: "0.4rem" }}>
                {t("serverSearch.region")}
              </h2>
              {Object.keys(t(regionKey, { returnObjects: true })).map(
                (key, index) => {
                  if (key === "all") {
                    return;
                  }
                  return (
                    <CheckItem
                      key={index}
                      item={key}
                      currrentItems={regionFilter}
                      callback={(e: {
                        target: { value: string; checked: boolean };
                      }) => {
                        if (e.target.checked) {
                          let oldArray = [...regionFilter];
                          if (regionFilter.includes("all")) {
                            oldArray = [];
                          }
                          setRegionFilter([...oldArray, e.target.value]);
                        } else {
                          if (regionFilter.length > 1) {
                            setRegionFilter((oldArray) => [
                              ...oldArray.filter(
                                (item) => item !== e.target.value,
                              ),
                            ]);
                          } else {
                            setRegionFilter(["all"]);
                          }
                        }
                      }}
                      name={t(`${regionKey}.${key}`)}
                      disabled={
                        !frostbite3.includes(gameName) &&
                        !extraGames.includes(gameName)
                      }
                    />
                  );
                },
              )}
            </ServerPageFilterRow>
          </ServerPageFilters>
        </Box>
      </ServerPageColumn>
      <Link
        to={`/servers?${new URLSearchParams({
          search: searchTerm,
          game: gameName,
          region: regionFilter.join(","),
          platform: platform,
          limit: 10,
        }).toString()}`}
      >
        <BigButtonSecondaryBox>
          {t("serverSearch.showMore")}
        </BigButtonSecondaryBox>
      </Link>
    </>
  );
}

export default Main;
