import { EmbeddedScene, PanelBuilders, SceneFlexItem, SceneFlexLayout, SceneVariableSet } from "@grafana/scenes";
import { LogSearchProps } from "./index";
import { TableQueryVariable } from "variables/TableQueryVariable";

export const getLogSearchScene = (props: LogSearchProps) => {
    const logQueryVariable = new TableQueryVariable({
        name: 'logQuery',
        table: 'otel_logs',
        config: props.config,
        type: 'textbox'
    });
    return new EmbeddedScene({
        $variables: new SceneVariableSet({
            variables: [logQueryVariable]
        }),
        controls: [
            logQueryVariable
        ],
        body: new SceneFlexLayout({
            direction: "column",
            children: [
                new SceneFlexItem({
                    height: "150px",
                    body: PanelBuilders.timeseries().build()
                }),
                new SceneFlexItem({
                    body: PanelBuilders.logs().build()
                })
            ]
        }),
    });
}
