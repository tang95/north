import { behaviors, SceneAppPage, SceneRefreshPicker, SceneTimePicker } from '@grafana/scenes';
import { createTimeRangeVariable } from 'common/variableHelpers';
import { JsonData } from 'components/AppConfig/AppConfig';
import pluginJson from '../../plugin.json';
import { prefixRoute } from '../../utils/utils.routing';
import { getServicePage } from '../Service/servicePage';
import { homeScene } from './homeScene';


export const getHomePage = (jsonData: JsonData) => {
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
      }),
    ],
    url: prefixRoute(),
    routePath: prefixRoute('/*'),
    subTitle: 'Observability solution based on Grafana, OpenTelemetry and ClickHouse',
    getScene: () => homeScene(jsonData),
    drilldowns: [
      {
        routePath: prefixRoute('/:service'),
        getPage: (routeMatch, parent) => getServicePage({ routeMatch, parent, jsonData }),
      },
    ],
  });
}
