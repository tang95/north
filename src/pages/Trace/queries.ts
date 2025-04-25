import { SceneQueryRunner } from "@grafana/scenes";


export const createTraceDetailQueries = (datasourceUid: string, traceID: string) => new SceneQueryRunner({
    datasource: { uid: datasourceUid },
    queries: [{
        refId: 'A',
        format: 3,
        rawSql: `
WITH '${traceID}' as trace_id, (SELECT min(Start)
                                                  FROM otel_traces_trace_id_ts
                                                  WHERE TraceId = trace_id) as trace_start, (SELECT max(End) + 1
                                                                                             FROM otel_traces_trace_id_ts
                                                                                             WHERE TraceId = trace_id) as trace_end
SELECT "TraceId"                                                                                                    as traceID,
   "SpanId"                                                                                                     as spanID,
   "ParentSpanId"                                                                                               as parentSpanID,
   "ServiceName"                                                                                                as serviceName,
   "SpanName"                                                                                                   as operationName,
   "ScopeName"                                                                                                  as instrumentationLibraryName,
   "ScopeVersion"                                                                                               as instrumentationLibraryVersion,
   multiply(toUnixTimestamp64Nano("Timestamp"), 0.000001)                                                       as startTime,
   multiply("Duration", 0.000001)                                                                               as duration,
   arrayMap(key -> map('key', key, 'value', "SpanAttributes"[key]),
            mapKeys("SpanAttributes"))                                                                          as tags,
   arrayMap(key -> map('key', key, 'value', "ResourceAttributes"[key]),
            mapKeys("ResourceAttributes"))                                                                      as serviceTags,
   if("StatusCode" IN ('Error', 'STATUS_CODE_ERROR'), 2, 0)                                                     as statusCode,
   arrayMap(
   (name, timestamp, attributes) -> tuple(name, toString(toUnixTimestamp64Milli(timestamp)), arrayMap(key
            -> map('key', key, 'value', attributes[ key]), mapKeys(attributes)))::Tuple(name String, timestamp
            String, fields Array(Map(String, String))), "Events".Name, "Events".Timestamp, "Events".Attributes) as logs
FROM otel_traces
WHERE traceID = trace_id
AND "Timestamp" >= trace_start
AND "Timestamp" <= trace_end
LIMIT $limit
`
    }]
});
