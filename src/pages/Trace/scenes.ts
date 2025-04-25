import {
    EmbeddedScene,
    PanelBuilders,
    SceneFlexItem,
    SceneFlexLayout
} from '@grafana/scenes';
import { ConfigProps } from '../../components/AppConfig/AppConfig';
import { createTraceDetailQueries } from './queries';

export function traceDetailScene(config: ConfigProps, traceId: string) {
    const traceDetailQueries = createTraceDetailQueries(config.datasourceUid, traceId);

    return new EmbeddedScene({
        body: new SceneFlexLayout({
            children: [
                new SceneFlexItem({
                    body: PanelBuilders.traces()
                        .setData(traceDetailQueries)
                        .build()
                })
            ]
        })
    });
}
