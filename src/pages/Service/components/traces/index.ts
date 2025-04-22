import { behaviors, SceneAppPage } from "@grafana/scenes";
import { JsonData } from "../../../../components/AppConfig/AppConfig";
import { prefixRoute } from "../../../../utils/utils.routing";
import { getTraceSearchScene, getTraceAnalyticsScene } from "./scenes";

export type TraceSearchProps = {
    service: string;
    jsonData: JsonData;
}

export const getTraceSearchPage = (props: TraceSearchProps) => {
    const { service } = props;
    return new SceneAppPage({
        title: "Trace Search",
        $behaviors: [new behaviors.SceneQueryController()],
        url: prefixRoute(`/${service}/trace-search`),
        routePath: 'trace-search',
        getScene: () => getTraceSearchScene(props)
    });
}

export type TraceAnalyticsProps = {
    service: string;
    jsonData: JsonData;
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
