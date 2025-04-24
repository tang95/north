import { behaviors, SceneAppPage } from "@grafana/scenes";
import { ConfigProps } from "../../../../components/AppConfig/AppConfig";
import { prefixRoute } from "../../../../utils/utils.routing";
import { getTopologyScene } from "./scenes";

export type TopologyProps = {
    service: string;
    config: ConfigProps;
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
