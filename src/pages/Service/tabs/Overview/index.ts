import { behaviors, SceneAppPage } from "@grafana/scenes";
import { ConfigProps } from "../../../../components/AppConfig/AppConfig";
import { prefixRoute } from "../../../../utils/utils.routing";
import { getOverviewScene } from "./scenes";

export type OverviewProps = {
    service: string;
    config: ConfigProps;
    folderUid: string;
}

export const getOverviewPage = (props: OverviewProps) => {
    const { service } = props;
    return new SceneAppPage({
        title: "Overview",
        $behaviors: [new behaviors.SceneQueryController()],
        url: prefixRoute(`/${service}`),
        routePath: '',
        getScene: () => getOverviewScene(props)
    });
}
