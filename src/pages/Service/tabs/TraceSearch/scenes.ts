import { VariableHide } from "@grafana/data";
import { EmbeddedScene, PanelBuilders, SceneFlexItem, SceneFlexLayout, SceneVariableSet } from "@grafana/scenes";
import { TraceQueryVariable } from "variables/TraceQueryVariable";
import { TraceSearchProps } from "./index";
export const getTraceSearchScene = (props: TraceSearchProps) => {
    const traceQueryVariable = new TraceQueryVariable({
        name: 'traceQuery',
        hide: VariableHide.hideLabel,
        config: props.config,
        type: 'textbox'
    });
    return new EmbeddedScene({
        $variables: new SceneVariableSet({
            variables: [ traceQueryVariable ]
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
