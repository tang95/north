import {
  EmbeddedScene
} from '@grafana/scenes';
import { JsonData } from '../../components/AppConfig/AppConfig';
import { HomeContentSceneObject } from './components/HomeContentSceneObject';
import { HomeSearchSceneObject } from './components/HomeSearchSceneObject';

export function homeScene(jsonData: JsonData) {
  return new EmbeddedScene({
    controls: [
      new HomeSearchSceneObject({}),
    ],
    body: new HomeContentSceneObject({}),
  });
}
