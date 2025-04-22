import { behaviors, SceneAppPage } from "@grafana/scenes";
import { JsonData } from "../../../../components/AppConfig/AppConfig";
import { prefixRoute } from "../../../../utils/utils.routing";
import { getDashboardsScene } from "./scenes";

export type DashboardsProps = {
    service: string;
    jsonData: JsonData;
}

export const getDashboardsPage = (props: DashboardsProps) => {
    const { service } = props;
    return new SceneAppPage({
        title: "Dashboards",
        $behaviors: [new behaviors.SceneQueryController()],
        url: prefixRoute(`/${service}/dashboards`),
        routePath: 'dashboards',
        getScene: () => getDashboardsScene(props)
    });
}
