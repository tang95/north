import { SceneQueryRunner } from "@grafana/scenes";


export const createCountQuery = (datasourceUid: string, service: string) => new SceneQueryRunner({
  queries: [
    {
      refId: 'A',
      datasource: { uid: datasourceUid },
      queryType: "table",
      rawSql: `
  SELECT 
    sumIf(Value, Attributes['status.code'] == 'STATUS_CODE_ERROR') AS Errors,
    sum(Value)                                                     AS Total,
    (Total - Errors) / Total                                       AS SuccessRate
  FROM otel_metrics_sum 
  WHERE MetricName = 'traces.span.metrics.calls'
    AND TimeUnix >= $__fromTime 
    AND TimeUnix <= $__toTime
    AND Attributes['service.name'] = '${service}'
  ORDER BY Total DESC
  `
    }
  ]
});

export const createTimeSeriesQuery = (datasourceUid: string, service: string) => new SceneQueryRunner({
  queries: [
    {
      refId: 'A',
      datasource: { uid: datasourceUid },
      queryType: "timeseries",
      rawSql: `
SELECT 
  $__timeInterval(TimeUnix)                                      AS Time,
  sumIf(Value, Attributes['status.code'] == 'STATUS_CODE_ERROR') AS Errors,
  sum(Value)                                                     AS Total,
  (Total - Errors) / Total                                       AS SuccessRate
FROM otel_metrics_sum
WHERE MetricName = 'traces.span.metrics.calls'
  AND TimeUnix >= $__fromTime 
  AND TimeUnix <= $__toTime
  AND Attributes['service.name'] = '${service}'
GROUP BY Time
ORDER BY Time ASC
`
    }
  ]
});
