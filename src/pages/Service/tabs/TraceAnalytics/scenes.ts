import { EmbeddedScene, PanelBuilders, SceneFlexItem, SceneFlexLayout, SceneVariableSet } from "@grafana/scenes";
import { TraceAnalyticsProps } from "./index";
import { TableQueryVariable } from "variables/TableQueryVariable";

export const getTraceAnalyticsScene = (props: TraceAnalyticsProps) => {
    const metricQueryVariable = new TableQueryVariable({
        name: 'metricQuery',
        table: 'otel_metrics',
        config: props.config,
        type: 'textbox'
    });
    return new EmbeddedScene({
        $variables: new SceneVariableSet({
            variables: [metricQueryVariable]
        }),
        controls: [
            metricQueryVariable
        ],
        body: new SceneFlexLayout({
            children: [
                new SceneFlexItem({
                    body: PanelBuilders.timeseries().build()
                })
            ]
        }),
    });
}

