import { behaviors, SceneAppPage, SceneAppPageLike, SceneRefreshPicker, SceneRouteMatch, SceneVariableSet, VariableValueSelectors } from '@grafana/scenes';
import { createTimeRangeVariable } from '../../utils/utils.variables';
import { ConfigProps } from '../../components/AppConfig/AppConfig';
import { prefixRoute } from '../../utils/utils.routing';
import { traceDetailScene } from './scenes';
import { createLimitVariable } from './variables';

export type TraceDetailPageProps = {
    routeMatch: SceneRouteMatch<{ traceId: string }>;
    parent: SceneAppPageLike;
    config: ConfigProps;
}

export const getTraceDetailPage = (props: TraceDetailPageProps) => {
    const { routeMatch, parent, config } = props;
    const { traceId } = routeMatch.params;
    const limitVariable = createLimitVariable();
    return new SceneAppPage({
        title: traceId,
        $timeRange: createTimeRangeVariable(),
        $variables: new SceneVariableSet({ variables: [limitVariable] }),
        $behaviors: [new behaviors.SceneQueryController()],
        controls: [
            new VariableValueSelectors({}),
            new SceneRefreshPicker({
                isOnCanvas: true,
                primary: true,
                withText: true
            }),
        ],
        getParentPage: () => parent,
        url: prefixRoute(`/trace/${traceId}`),
        routePath: `*`,
        getScene: () => traceDetailScene(config, traceId)
    });
}
