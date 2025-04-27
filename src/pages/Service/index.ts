import { behaviors, SceneAppPageLike, SceneRefreshPicker, SceneRouteMatch, SceneTimePicker } from '@grafana/scenes';
import { createTimeRangeVariable } from '../../common/variableHelpers';
import { ConfigProps } from '../../components/AppConfig/AppConfig';
import { prefixRoute } from '../../utils/utils.routing';
import { ServiceLayout } from './components/ServiceLayout';
import { getAlertsPage } from './tabs/Alert';
import { getDashboardPage } from './tabs/Dashboard';
import { getLogSearchPage } from './tabs/LogSearch';
import { getOverviewPage } from './tabs/Overview';
import { getTopologyPage } from './tabs/Topology';
import { getTraceAnalyticsPage } from './tabs/TraceAnalytics';
import { getTraceSearchPage } from './tabs/TraceSearch';

export type ServicePageProps = {
    routeMatch: SceneRouteMatch<{ service: string }>;
    parent: SceneAppPageLike;
    config: ConfigProps;
}

export const getServicePage = (props: ServicePageProps) => {
    const { routeMatch, parent, config } = props;
    const { service } = routeMatch.params;

    return new ServiceLayout({
        title: service,
        service: service,
        config: config,
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
        preserveUrlKeys: ['to', 'from'],
        routePath: `*`,
        serviceTabs: [
            (folderUid: string) => getOverviewPage({ config: config, service: service, folderUid: folderUid }),
            (folderUid: string) => getTopologyPage({ config: config, service: service, folderUid: folderUid }),
            (folderUid: string) => getTraceAnalyticsPage({ config: config, service: service, folderUid: folderUid }),
            (folderUid: string) => getTraceSearchPage({ config: config, service: service, folderUid: folderUid }),
            (folderUid: string) => getLogSearchPage({ config: config, service: service, folderUid: folderUid }),
            (folderUid: string) => getDashboardPage({ config: config, service: service, folderUid: folderUid }),
            (folderUid: string) => getAlertsPage({ config: config, service: service, folderUid: folderUid })
        ]
    });
}
