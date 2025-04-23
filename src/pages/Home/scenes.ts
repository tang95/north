import {
  CustomVariable,
  EmbeddedScene,
  SceneVariableSet,
  TextBoxVariable,
  VariableValueSelectors
} from '@grafana/scenes';
import { JsonData } from '../../components/AppConfig/AppConfig';
import { HomeContentSceneObject } from './components/HomeContentSceneObject';
import { HomeSearchSceneObject } from './components/HomeSearchSceneObject';

export function homeScene(jsonData: JsonData) {
  const textVar = new TextBoxVariable({
    name: 'text',
  });

  return new EmbeddedScene({
    $variables: new SceneVariableSet({ variables: [textVar] }),
    controls: [
      new HomeSearchSceneObject({ textVar }),
      new VariableValueSelectors({})
    ],
    body: new HomeContentSceneObject({}),
  });
}
