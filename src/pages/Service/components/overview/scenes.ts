import { EmbeddedScene, PanelBuilders, SceneFlexItem, SceneFlexLayout, SceneQueryRunner } from "@grafana/scenes";
import { OverviewProps } from "./index";

export const getOverviewScene = (props: OverviewProps) => {
    const dataRunner = new SceneQueryRunner({
        queries: [
            {
                refId: 'A',
                scenarioId: "slow_query",
                datasource: {
                    type: "grafana-testdata-datasource",
                    uid: "gdev-testdata"
                },
                stringInput: "2s"
            },
        ]
    });
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
