import {
  EmbeddedScene,
  SceneVariableSet,
} from '@grafana/scenes';
import { ConfigProps } from '../../components/AppConfig/AppConfig';
import { HomeContentSceneObject } from './components/HomeContentSceneObject';
import { HomeSearchSceneObject } from './components/HomeSearchSceneObject';
import { createServiceListQueries } from './queries';
import { createKeywordVariable, createNamespaceVariable, createSortKeyVariable, createSortOrderVariable } from './variables';

export function homeScene(config: ConfigProps) {
  const sortKeyVar = createSortKeyVariable();
  const sortOrderVar = createSortOrderVariable();
  const namespaceVar = createNamespaceVariable();
  const keywordVar = createKeywordVariable();
  const serviceListQueries = createServiceListQueries(config.datasourceUid);

  return new EmbeddedScene({
    $variables: new SceneVariableSet({ variables: [sortKeyVar, sortOrderVar, namespaceVar, keywordVar] }),
    controls: [
      new HomeSearchSceneObject({ sortKeyVar, sortOrderVar, namespaceVar, keywordVar })
    ],
    body: new HomeContentSceneObject({$data: serviceListQueries}),
  });
}
