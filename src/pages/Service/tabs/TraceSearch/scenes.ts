import { EmbeddedScene, PanelBuilders, SceneFlexItem, SceneFlexLayout } from "@grafana/scenes";
import { TraceSearchProps } from "./index";

export const getTraceSearchScene = (props: TraceSearchProps) => {
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