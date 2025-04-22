import { behaviors, SceneAppPage } from "@grafana/scenes";
import { JsonData } from "../../../../components/AppConfig/AppConfig";
import { prefixRoute } from "../../../../utils/utils.routing";
import { getTopologyScene } from "./scenes";

export type TopologyProps = {
    service: string;
    jsonData: JsonData;
}

export const getTopologyPage = (props: TopologyProps) => {
    const { service } = props;
    return new SceneAppPage({
        title: "Topology",
        $behaviors: [new behaviors.SceneQueryController()],
        url: prefixRoute(`/${service}/topology`),
        routePath: 'topology',
        getScene: () => getTopologyScene(props)
    });
}
