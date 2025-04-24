import { behaviors, SceneAppPage } from "@grafana/scenes";
import { ConfigProps } from "../../../../components/AppConfig/AppConfig";
import { prefixRoute } from "../../../../utils/utils.routing";
import { getTraceAnalyticsScene } from "./scenes";

export type TraceAnalyticsProps = {
    service: string;
    config: ConfigProps;
}

export const getTraceAnalyticsPage = (props: TraceAnalyticsProps) => {
    const { service } = props;
    return new SceneAppPage({
        title: "Trace Analytics",
        $behaviors: [new behaviors.SceneQueryController()],
        url: prefixRoute(`/${service}/trace-analytics`),
        routePath: 'trace-analytics',
        getScene: () => getTraceAnalyticsScene(props)
    });
}
