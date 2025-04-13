import { SceneAppPage } from '@grafana/scenes';
import { baseRoute } from '../../utils/utils.routing';
import { homeScene } from './homeScene';
import { JsonData } from 'components/AppConfig/AppConfig';

export const getHomePage = (jsonData: JsonData) => {
  return new SceneAppPage({
    title: 'North',
    url: baseRoute(),
    subTitle: '基于 Grafana、OpenTelemetry 和 ClickHouse 的可观测性解决方案',
    getScene: () => homeScene(jsonData)
  });
}
