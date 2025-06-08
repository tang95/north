import { EmbeddedScene, PanelBuilders, SceneFlexItem, SceneFlexLayout, SceneVariableSet } from "@grafana/scenes";
import { TableQueryVariable } from "variables/TableQueryVariable";
import { TraceSearchProps } from "./index";
export const getTraceSearchScene = (props: TraceSearchProps) => {
    const traceQueryVariable = new TableQueryVariable({
        name: 'traceQuery',
        table: 'otel_metrics',
        config: props.config,
        type: 'textbox'
    });

    return new EmbeddedScene({
        $variables: new SceneVariableSet({
            variables: [traceQueryVariable]
        }),
        controls: [
            traceQueryVariable
        ],
        body: new SceneFlexLayout({
            direction: "column",
            children: [
                new SceneFlexItem({
                    height: "150px",
                    body: PanelBuilders.timeseries().build()
                }),
                new SceneFlexItem({
                    body: PanelBuilders.table().build()
                })
            ]
        }),
    });
}
