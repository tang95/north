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
import { createSortKeyVariable } from './variables';

export function homeScene(jsonData: JsonData) {
  const sortKeyVar = createSortKeyVariable();

  return new EmbeddedScene({
    $variables: new SceneVariableSet({ variables: [sortKeyVar] }),
    controls: [
      new HomeSearchSceneObject({ sortKeyVar })
    ],
    body: new HomeContentSceneObject({}),
  });
}
