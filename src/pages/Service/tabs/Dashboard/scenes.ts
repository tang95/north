import { EmbeddedScene, PanelBuilders, SceneFlexItem, SceneFlexLayout } from "@grafana/scenes";
import { DashboardProps } from "./index";

export const getDashboardScene = (props: DashboardProps) => {
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
