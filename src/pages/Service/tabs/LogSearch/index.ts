import { behaviors, SceneAppPage } from "@grafana/scenes";
import { ConfigProps } from "../../../../components/AppConfig/AppConfig";
import { prefixRoute } from "../../../../utils/utils.routing";
import { getLogSearchScene } from "./scenes";

export type LogSearchProps = {
    service: string;
    config: ConfigProps;
    folderUid: string;
}

export const getLogSearchPage = (props: LogSearchProps) => {
    const { service } = props;
    return new SceneAppPage({
        title: "Log Search",
        $behaviors: [new behaviors.SceneQueryController()],
        url: prefixRoute(`/${service}/log-search`),
        routePath: 'log-search',
        getScene: () => getLogSearchScene(props)
    });
}
