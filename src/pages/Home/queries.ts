import { SceneQueryRunner } from "@grafana/scenes";


export const createHomeQueries = (datasourceUid: string) => new SceneQueryRunner({
  queries: [
    {
      refId: 'service',
      datasource: { uid: datasourceUid },
      queryType: "table",
      rawSql: `
SELECT 
  ResourceAttributes['service.name'] AS Service, 
  ResourceAttributes['telemetry.sdk.language'] AS Language,
  ResourceAttributes['service.namespace'] AS Namespace,
  countMergeIf(t.Total, StatusCode == 'Error') AS Errors,
  countMerge(t.Total) AS Total,
  1 - Errors / Total AS SuccessRate
FROM otel_span_analysis_agg as t
WHERE Timestamp >= $__fromTime
  AND Timestamp <= $__toTime
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
  countMerge(Total) AS Total
FROM
  otel_span_analysis_agg
WHERE Timestamp >= $__fromTime
  AND Timestamp <= $__toTime
GROUP BY
  Namespace
ORDER BY
  Total DESC
`
    }
  ]
});
