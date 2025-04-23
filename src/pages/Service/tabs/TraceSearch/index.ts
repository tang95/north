import { behaviors, SceneAppPage } from "@grafana/scenes";
import { JsonData } from "../../../../components/AppConfig/AppConfig";
import { prefixRoute } from "../../../../utils/utils.routing";
import { getTraceSearchScene } from "./scenes";

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
