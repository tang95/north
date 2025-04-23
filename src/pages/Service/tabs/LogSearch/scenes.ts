import { EmbeddedScene, PanelBuilders, SceneFlexItem, SceneFlexLayout } from "@grafana/scenes";
import { LogSearchProps } from "./index";

export const getLogSearchScene = (props: LogSearchProps) => {
    return new EmbeddedScene({
        controls: [],
        body: new SceneFlexLayout({
            children: [
                new SceneFlexItem({
                    body: PanelBuilders.logs().build()
                })
            ]
        }),
    });
}
