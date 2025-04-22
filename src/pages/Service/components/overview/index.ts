import { behaviors, SceneAppPage } from "@grafana/scenes";
import { JsonData } from "../../../../components/AppConfig/AppConfig";
import { prefixRoute } from "../../../../utils/utils.routing";
import { getOverviewScene } from "./scenes";

export type OverviewProps = {
    service: string;
    jsonData: JsonData;
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
