import { behaviors, SceneAppPage, SceneAppPageLike, SceneRefreshPicker, SceneRouteMatch, SceneTimePicker } from '@grafana/scenes';
import { createTimeRangeVariable } from '../../common/variableHelpers';
import { JsonData } from '../../components/AppConfig/AppConfig';
import { prefixRoute } from '../../utils/utils.routing';
import { getOverviewPage } from './tabs/Overview';
import { getLogSearchPage } from './tabs/LogSearch';
import { getTopologyPage } from './tabs/Topology';
import { getTraceSearchPage } from './tabs/TraceSearch';
import { getTraceAnalyticsPage } from './tabs/TraceAnalytics';
import { getDashboardPage } from './tabs/Dashboard';
import { getAlertsPage } from './tabs/Alert';


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
        routePath: `*`,
        tabs: [
            getOverviewPage({ jsonData: jsonData, service: service }),
            getTopologyPage({ jsonData: jsonData, service: service }),
            getTraceAnalyticsPage({ jsonData: jsonData, service: service }),
            getTraceSearchPage({ jsonData: jsonData, service: service }),
            getLogSearchPage({ jsonData: jsonData, service: service }),
            getDashboardPage({ jsonData: jsonData, service: service }),
            getAlertsPage({ jsonData: jsonData, service: service })
        ]
    });
}
