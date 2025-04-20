import { EmbeddedScene, PanelBuilders, SceneFlexItem, SceneFlexLayout } from "@grafana/scenes";
import { JsonData } from "../../components/AppConfig/AppConfig";


export const serviceScene = (service: string, jsonData: JsonData) => {
    return new EmbeddedScene({
        controls: [],
        body: new SceneFlexLayout({
            children: [
                new SceneFlexItem({
                    body: PanelBuilders.timeseries().build()
                })
            ]
        }),
    });
}
