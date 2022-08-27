import * as React from "react";
import "../../../../locales/config";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../../assets/scss/App.scss";
import { Align, Circle } from "../../../Materials";
import { ServerOwnerResult } from "../../../../api/ReturnTypes";
import {
  ConLink,
  OriginDescription,
  OriginName,
  OriginProfile,
  Spacing,
} from "./Playgrounds";

export function PlaygroundOwner(props: {
  owner: ServerOwnerResult;
  game: string;
}): React.ReactElement {
  const { t } = useTranslation();
  const owner = props.owner;
  const ConditionalLink = ({ children, to, condition }: ConLink) =>
    !!condition && to ? <Link to={to}>{children}</Link> : <>{children}</>;
  if (owner === null) {
    return (
      <Spacing>
        <h3>{t("playgrounds.owner.main")}</h3>
        <Align>
          <Circle style={{ marginTop: ".5rem" }} />
          <div>
            <OriginName>{t("404")}</OriginName>
            <OriginDescription>{t("playgrounds.owner.none")}</OriginDescription>
          </div>
        </Align>
      </Spacing>
    );
  }
  return (
    <Spacing>
      <h2>{t("playgrounds.owner.main")}</h2>
      <Align>
        <ConditionalLink
          to={`/stats/pc/playerid/${owner.id}?game=${
            props.game
          }&name=${encodeURIComponent(owner.name)}`}
          condition={props.game !== "bf2042"}
        >
          <OriginProfile src={owner.avatar} />
        </ConditionalLink>
        <ConditionalLink
          to={`/stats/pc/playerid/${owner.id}?game=${
            props.game
          }&name=${encodeURIComponent(owner.name)}`}
          condition={props.game !== "bf2042"}
        >
          <div>
            <OriginName>
              {owner.name !== "" ? owner.name : t("playgrounds.owner.unknown")}
            </OriginName>
            <OriginDescription>
              {t("stats.originDescription")}
            </OriginDescription>
          </div>
        </ConditionalLink>
      </Align>
    </Spacing>
  );
}
