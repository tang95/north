import { behaviors, SceneAppPage } from "@grafana/scenes";
import { ConfigProps } from "../../../../components/AppConfig/AppConfig";
import { prefixRoute } from "../../../../utils/utils.routing";
import { getDashboardScene } from "./scenes";

export type DashboardProps = {
    service: string;
    config: ConfigProps;
    folderUid: string;
}

export const getDashboardPage = (props: DashboardProps) => {
    const { service } = props;
    return new SceneAppPage({
        title: "Dashboards",
        $behaviors: [new behaviors.SceneQueryController()],
        url: prefixRoute(`/${service}/dashboards`),
        routePath: 'dashboards',
        getScene: () => getDashboardScene(props)
    });
}
