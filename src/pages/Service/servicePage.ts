import { behaviors, SceneAppPage, SceneAppPageLike, SceneRefreshPicker, SceneRouteMatch, SceneTimePicker } from '@grafana/scenes';
import { createTimeRangeVariable } from 'common/variableHelpers';
import { JsonData } from '../../components/AppConfig/AppConfig';
import { prefixRoute } from '../../utils/utils.routing';
import { serviceScene } from './serviceScene';

export type ServicePageProps = {
    routeMatch: SceneRouteMatch<{ service: string }>;
    parent: SceneAppPageLike;
    jsonData: JsonData;
}

export const getServicePage = (props: ServicePageProps) => {
    const { routeMatch, parent, jsonData } = props;
    const { service } = routeMatch.params;
    return new SceneAppPage({
        title: service,
        $timeRange: createTimeRangeVariable(),
        $behaviors: [new behaviors.SceneQueryController()],
        controls: [
            new SceneTimePicker({ isOnCanvas: true }),
            new SceneRefreshPicker({
                isOnCanvas: true,
                primary: true,
            }),
        ],
        getParentPage: () => parent,
        url: prefixRoute(`/${service}`),
        routePath: prefixRoute('/*'),
        getScene: () => serviceScene(service, jsonData)
    });
}
