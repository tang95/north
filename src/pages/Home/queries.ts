import { SceneQueryRunner } from "@grafana/scenes";


export const createHomeQueries = (datasourceUid: string) => new SceneQueryRunner({
  queries: [
    {
      refId: 'service',
      datasource: { uid: datasourceUid },
      queryType: "table",
      rawSql: `
SELECT 
  Attributes['service.name'] AS Service, 
  ResourceAttributes['telemetry.sdk.language'] AS Language,
  ResourceAttributes['service.namespace'] AS Namespace,
  sumIf(Value, Attributes['status.code'] == 'STATUS_CODE_ERROR') AS Errors,
  sum(Value) AS Total,
  1 - Errors / Total AS SuccessRate
FROM otel_metrics_sum 
WHERE MetricName = 'traces.span.metrics.calls'
  AND TimeUnix >= $__fromTime 
  AND TimeUnix <= $__toTime
GROUP BY Service, Language, Namespace
ORDER BY Total DESC
`
    },
    {
      refId: 'namespace',
      datasource: { uid: datasourceUid },
      queryType: "table",
      rawSql: `
SELECT 
ResourceAttributes['service.namespace'] AS Namespace, 
sum(Value) AS Total
FROM otel_metrics_sum 
WHERE MetricName = 'traces.span.metrics.calls'
AND TimeUnix >= $__fromTime 
AND TimeUnix <= $__toTime
GROUP BY Namespace
ORDER BY Total DESC
`
    }
  ]
});
