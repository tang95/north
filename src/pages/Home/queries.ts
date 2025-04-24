import { SceneQueryRunner } from "@grafana/scenes";


export const createServiceListQueries = (datasourceUid: string) => new SceneQueryRunner({
    queries: [
        {
            refId: 'A',
            datasource: { uid: datasourceUid },
            queryType: "table",
            rawSql: `
SELECT 
  Attributes['service.name'] AS Service, 
  sumIf(Value, Attributes['status.code'] == 'STATUS_CODE_ERROR') AS Errors,
  sum(Value) AS Total,
  Errors / Total AS ErrorRate
FROM otel_metrics_sum 
WHERE MetricName = 'traces.span.metrics.calls'
  AND TimeUnix >= $__fromTime 
  AND TimeUnix <= $__toTime
GROUP BY Service
            `
        }
    ]
});
