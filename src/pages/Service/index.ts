import { behaviors, SceneAppPage, SceneAppPageLike, SceneRefreshPicker, SceneRouteMatch, SceneTimePicker } from '@grafana/scenes';
import { createTimeRangeVariable } from '../../common/variableHelpers';
import { ConfigProps } from '../../components/AppConfig/AppConfig';
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
    config: ConfigProps;
}

export const getServicePage = (props: ServicePageProps) => {
    const { routeMatch, parent, config } = props;
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
            getOverviewPage({ config: config, service: service }),
            getTopologyPage({ config: config, service: service }),
            getTraceAnalyticsPage({ config: config, service: service }),
            getTraceSearchPage({ config: config, service: service }),
            getLogSearchPage({ config: config, service: service }),
            getDashboardPage({ config: config, service: service }),
            getAlertsPage({ config: config, service: service })
        ]
    });
}
