import { behaviors, SceneAppPage } from "@grafana/scenes";
import { JsonData } from "../../../../components/AppConfig/AppConfig";
import { prefixRoute } from "../../../../utils/utils.routing";
import { getAlertsScene } from "./scenes";

export type AlertsProps = {
    service: string;
    jsonData: JsonData;
}

export const getAlertsPage = (props: AlertsProps) => {
    const { service } = props;
    return new SceneAppPage({
        title: "Alerts",
        $behaviors: [new behaviors.SceneQueryController()],
        url: prefixRoute(`/${service}/alerts`),
        routePath: 'alerts',
        getScene: () => getAlertsScene(props)
    });
}
