import { EmbeddedScene, PanelBuilders, SceneFlexItem, SceneFlexLayout, SceneVariableSet } from "@grafana/scenes";
import { TraceAnalyticsProps } from "./index";
import { MetricQueryVariable } from "variables/MetricQueryVariable";

export const getTraceAnalyticsScene = (props: TraceAnalyticsProps) => {
    const metricQueryVariable = new MetricQueryVariable({
        name: 'metricQuery',
        value: '',
    });
    return new EmbeddedScene({
        $variables: new SceneVariableSet({
            variables: [ metricQueryVariable ]
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

