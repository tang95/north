import { SceneQueryRunner } from "@grafana/scenes";


export const getDemoQueries = () => new SceneQueryRunner({
    queries: [
        {
            refId: 'A',
            scenarioId: "slow_query",
            datasource: {
                type: "grafana-testdata-datasource",
                uid: "gdev-testdata"
            },
            stringInput: "1s"
        },
    ]
});
