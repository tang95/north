import { EmbeddedScene, PanelBuilders, SceneFlexItem, SceneFlexLayout } from "@grafana/scenes";
import { OverviewProps } from "./index";
import { getDemoQueries } from "./queries";

export const getOverviewScene = (props: OverviewProps) => {
    const dataRunner = getDemoQueries();
    return new EmbeddedScene({
        controls: [],
        body: new SceneFlexLayout({
            children: [
                new SceneFlexItem({
                    body: PanelBuilders.timeseries().setData(dataRunner).build()
                })
            ]
        }),
    });
}
