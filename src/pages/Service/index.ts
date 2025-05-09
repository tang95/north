import { behaviors, SceneAppPage, SceneAppPageLike, SceneRefreshPicker, SceneRouteMatch, SceneTimePicker } from '@grafana/scenes';
import { createTimeRangeVariable } from '../../utils/utils.variables';
import { ConfigProps } from '../../components/AppConfig/AppConfig';
import { getUrlParams } from '../../utils/utils.url';
import { prefixRoute } from '../../utils/utils.routing';
import { getAlertsPage } from './tabs/Alert';
import { getDashboardPage } from './tabs/Dashboard';
import { getLogSearchPage } from './tabs/LogSearch';
import { getOverviewPage } from './tabs/Overview';
import { getTopologyPage } from './tabs/Topology';
import { getTraceAnalyticsPage } from './tabs/TraceAnalytics';
import { getTraceSearchPage } from './tabs/TraceSearch';
import { getLanguageIconUrl } from '../../utils/utils.icon';

export type ServicePageProps = {
    routeMatch: SceneRouteMatch<{ service: string }>;
    parent: SceneAppPageLike;
    config: ConfigProps;
}

export const getServicePage = (props: ServicePageProps) => {
    const { routeMatch, parent, config } = props;
    const { service } = routeMatch.params;
    const { folderUid, language } = getUrlParams();

    return new SceneAppPage({
        title: service,
        titleImg: getLanguageIconUrl(language),
        $timeRange: createTimeRangeVariable(),
        $behaviors: [new behaviors.SceneQueryController()],
        controls: [
            new SceneTimePicker({ isOnCanvas: true }),
            new SceneRefreshPicker({
                isOnCanvas: true,
                primary: true,
                withText: true
            }),
        ],
        getParentPage: () => parent,
        url: prefixRoute(`/${service}`),
        preserveUrlKeys: ['to', 'from'],
        routePath: `*`,
        tabs: [
            getOverviewPage({ config: config, service: service, folderUid: folderUid }),
            getTopologyPage({ config: config, service: service, folderUid: folderUid }),
            getTraceAnalyticsPage({ config: config, service: service, folderUid: folderUid }),
            getTraceSearchPage({ config: config, service: service, folderUid: folderUid }),
            getLogSearchPage({ config: config, service: service, folderUid: folderUid }),
            getDashboardPage({ config: config, service: service, folderUid: folderUid }),
            getAlertsPage({ config: config, service: service, folderUid: folderUid })
        ]
    });
}
