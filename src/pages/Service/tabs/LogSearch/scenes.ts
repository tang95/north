import { EmbeddedScene, PanelBuilders, SceneFlexItem, SceneFlexLayout, SceneVariableSet } from "@grafana/scenes";
import { LogSearchProps } from "./index";
import { LogQueryVariable } from "variables/LogQueryVariable";

export const getLogSearchScene = (props: LogSearchProps) => {
    const logQueryVariable = new LogQueryVariable({
        name: 'logQuery',
        value: '',
    });
    return new EmbeddedScene({
        $variables: new SceneVariableSet({
            variables: [ logQueryVariable ]
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
