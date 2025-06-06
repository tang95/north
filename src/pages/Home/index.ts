import { behaviors, SceneAppPage, SceneRefreshPicker, SceneTimePicker } from '@grafana/scenes';
import { createTimeRangeVariable } from '../../utils/utils.variables';
import { ConfigProps } from '../../components/AppConfig/AppConfig';
import pluginJson from '../../plugin.json';
import { prefixRoute } from '../../utils/utils.routing';
import { getServicePage } from '../Service';
import { homeScene } from './scenes';
import { getTraceDetailPage } from '../Trace';


export const getHomePage = (config: ConfigProps) => {
  return new SceneAppPage({
    title: 'North',
    titleImg: `/public/plugins/${pluginJson.id}/img/logo.svg`,
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
    url: prefixRoute(),
    routePath: '*',
    preserveUrlKeys: ['to', 'from'],
    subTitle: 'Observability solution based on Grafana, OpenTelemetry and ClickHouse',
    getScene: () => homeScene(config),
    drilldowns: [
      {
        routePath: ':service/*',
        getPage: (routeMatch, parent) => getServicePage({ routeMatch, parent, config }),
      },
      {
        routePath: 'trace/:traceId',
        getPage: (routeMatch, parent) => getTraceDetailPage({ routeMatch, parent, config }),
      }
    ],
  });
}
