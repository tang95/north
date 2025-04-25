import {
  EmbeddedScene
} from '@grafana/scenes';
import { ConfigProps } from '../../components/AppConfig/AppConfig';
import { HomeSceneObject } from './components/HomeSceneObject';
import { createHomeQueries } from './queries';

export function homeScene(config: ConfigProps) {
  const homeQueries = createHomeQueries(config.datasourceUid);
  return new EmbeddedScene({
    body: new HomeSceneObject({ $data: homeQueries }),
  });
}
