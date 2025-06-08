import { SceneQueryRunner } from "@grafana/scenes";


export const createCountQuery = (datasourceUid: string, service: string) => new SceneQueryRunner({
  queries: [
    {
      refId: 'A',
      datasource: { uid: datasourceUid },
      queryType: "table",
      rawSql: `
SELECT 
  countMergeIf(t.Total, StatusCode == 'Error') AS Errors,
  countMerge(t.Total) AS Total,
  1 - Errors / Total AS SuccessRate
FROM otel_span_analysis_agg as t
WHERE Timestamp >= $__fromTime
  AND Timestamp <= $__toTime
  AND ResourceAttributes['service.name'] = '${service}'
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
  $__timeInterval(Timestamp)                                      AS Time,
  countMergeIf(t.Total, StatusCode == 'Error') AS Errors,
  countMerge(t.Total) AS Total,
  1 - Errors / Total AS SuccessRate
FROM otel_span_analysis_agg as t
WHERE Timestamp >= $__fromTime
  AND Timestamp <= $__toTime
  AND ResourceAttributes['service.name'] = '${service}'
GROUP BY Time
ORDER BY Time ASC
`
    }
  ]
});
