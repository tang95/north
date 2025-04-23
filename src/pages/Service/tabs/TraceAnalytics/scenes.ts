import { EmbeddedScene, PanelBuilders, SceneFlexItem, SceneFlexLayout } from "@grafana/scenes";
import { TraceAnalyticsProps } from "./index";


export const getTraceAnalyticsScene = (props: TraceAnalyticsProps) => {
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

