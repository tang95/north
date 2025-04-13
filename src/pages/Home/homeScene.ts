import {
  EmbeddedScene,
  PanelBuilders,
  SceneControlsSpacer,
  SceneFlexItem,
  SceneFlexLayout,
  SceneRefreshPicker,
  SceneTimePicker,
  SceneTimeRange,
  SceneVariableSet,
  VariableValueSelectors
} from '@grafana/scenes';
import { JsonData } from '../../components/AppConfig/AppConfig';
import { HomeSceneObject } from './HomeSceneObject';

export function homeScene(jsonData: JsonData) {
  const timeRange = new SceneTimeRange({
    from: 'now-6h',
    to: 'now',
  });
  // Home object definition
  const homeObject = new HomeSceneObject({
    counter: 5,
  });

  return new EmbeddedScene({
    $timeRange: timeRange,
    $variables: new SceneVariableSet({ variables: [] }),
    body: new SceneFlexLayout({
      children: [
        new SceneFlexItem({
          minHeight: 300,
          body: PanelBuilders.timeseries()
            // Title is using variable value
            .build(),
        }),
      ],
    }),
    controls: [
      new VariableValueSelectors({}),
      new SceneControlsSpacer(),
      homeObject,
      new SceneTimePicker({ isOnCanvas: true }),
      new SceneRefreshPicker({
        intervals: ['5s', '1m', '1h'],
        isOnCanvas: true,
      }),
    ],
  });
}
