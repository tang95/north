import { EmbeddedScene, PanelBuilders, SceneDataTransformer, SceneFlexItem, SceneFlexLayout, SceneQueryRunner, VizPanel } from "@grafana/scenes";
import { FieldColorModeId, GraphDrawStyle, LineInterpolation } from "@grafana/schema";
import { OverviewProps } from "./index";
import { createCountQuery, createTimeSeriesQuery } from "./queries";

const createTotalRow = (countQuery: SceneQueryRunner, timeSeriesQuery: SceneQueryRunner) => {
    const total = new SceneDataTransformer({
        $data: countQuery,
        transformations: [
            { "id": "filterFieldsByName", "options": { "byVariable": false, "include": { "names": ["Total"] } } }
        ],
    })
    const totalTimeSeries = new SceneDataTransformer({
        $data: timeSeriesQuery,
        transformations: [
            { "id": "filterFieldsByName", "options": { "byVariable": false, "include": { "names": ["Time", "Total"] } } }
        ],
    })
    return new SceneFlexLayout({
        direction: "row",
        height: "150px",
        children: [
            new SceneFlexItem({
                width: "150px",
                body: PanelBuilders.stat()
                    .setData(total)
                    .setColor({ mode: FieldColorModeId.Fixed, fixedColor: "green" })
                    .setUnit("short")
                    .setTitle("Total")
                    .build()
            }),
            new SceneFlexItem({
                body: PanelBuilders.timeseries()
                    .setData(totalTimeSeries)
                    .setUnit("short")
                    .setHoverHeader(true)
                    .setCustomFieldConfig("drawStyle", GraphDrawStyle.Bars)
                    .setCustomFieldConfig("fillOpacity", 100)
                    .setOption("legend", { showLegend: false })
                    .build()
            })
        ]
    });
}

const createErrorRow = (countQuery: SceneQueryRunner, timeSeriesQuery: SceneQueryRunner) => {
    const error = new SceneDataTransformer({
        $data: countQuery,
        transformations: [
            { "id": "filterFieldsByName", "options": { "byVariable": false, "include": { "names": ["Errors"] } } }
        ],
    })
    const errorTimeSeries = new SceneDataTransformer({
        $data: timeSeriesQuery,
        transformations: [
            { "id": "filterFieldsByName", "options": { "byVariable": false, "include": { "names": ["Time", "Errors"] } } }
        ],
    })
    return new SceneFlexLayout({
        direction: "row",
        height: "150px",
        children: [
            new SceneFlexItem({
                width: "150px",
                body: PanelBuilders.stat()
                    .setData(error)
                    .setColor({ mode: FieldColorModeId.Fixed, fixedColor: "red" })
                    .setTitle("Error")
                    .setUnit("short")
                    .build()
            }),
            new SceneFlexItem({
                body: PanelBuilders.timeseries()
                    .setData(errorTimeSeries)
                    .setUnit("short")
                    .setHoverHeader(true)
                    .setCustomFieldConfig("drawStyle", GraphDrawStyle.Bars)
                    .setCustomFieldConfig("fillOpacity", 100)
                    .setOption("legend", { showLegend: false })
                    .setColor({ mode: FieldColorModeId.Fixed, fixedColor: "red" })
                    .build()
            })
        ]
    });
}

const createSuccessRateRow = (countQuery: SceneQueryRunner, timeSeriesQuery: SceneQueryRunner) => {
    const successRate = new SceneDataTransformer({
        $data: countQuery,
        transformations: [
            { "id": "filterFieldsByName", "options": { "byVariable": false, "include": { "names": ["SuccessRate"] } } }
        ],
    })
    const successRateTimeSeries = new SceneDataTransformer({
        $data: timeSeriesQuery,
        transformations: [
            { "id": "filterFieldsByName", "options": { "byVariable": false, "include": { "names": ["Time", "SuccessRate"] } } }
        ],
    })
    return new SceneFlexLayout({
        direction: "row",
        height: "150px",
        children: [
            new SceneFlexItem({
                width: "150px",
                body: PanelBuilders.stat()
                    .setData(successRate)
                    .setTitle("Success %")
                    .setUnit("percentunit")
                    .build()
            }),
            new SceneFlexItem({
                body: PanelBuilders.timeseries()
                    .setData(successRateTimeSeries)
                    .setUnit("percentunit")
                    .setHoverHeader(true)
                    .setCustomFieldConfig("fillOpacity", 10)
                    .setCustomFieldConfig("lineInterpolation", LineInterpolation.Smooth)
                    .setCustomFieldConfig("axisSoftMax", 1)
                    .setCustomFieldConfig("axisSoftMin", 0)
                    .setOption("legend", { showLegend: false })
                    .build()
            })
        ]
    });
}

const createAlertListRow = (folderUid: string) => {
    return new SceneFlexLayout({
        direction: "row",
        children: [
            new SceneFlexItem({
                body: new VizPanel({
                    title: "Alerts",
                    pluginId: "alertlist",
                    options: {
                        stateFilter: {
                            firing: true,
                            pending: true,
                            recovering: true,
                            noData: true,
                            normal: true,
                            error: true
                        },
                        folder: {
                            uid: folderUid
                        }
                    }
                })
            })
        ]
    });
}

export const getOverviewScene = (props: OverviewProps) => {
    const { config, service, folderUid } = props;
    const countQuery = createCountQuery(config.datasourceUid, service);
    const timeSeriesQuery = createTimeSeriesQuery(config.datasourceUid, service);

    return new EmbeddedScene({
        body: new SceneFlexLayout({
            direction: "column",
            children: [
                createTotalRow(countQuery, timeSeriesQuery),
                createErrorRow(countQuery, timeSeriesQuery),
                createSuccessRateRow(countQuery, timeSeriesQuery),
                createAlertListRow(folderUid)
            ]
        }),
    });
}
