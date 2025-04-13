import React from 'react';
import { SceneComponentProps, SceneObjectBase, SceneObjectState } from '@grafana/scenes';
import { Input } from '@grafana/ui';

interface HomeSceneObjectState extends SceneObjectState {
  counter: number;
}

export class HomeSceneObject extends SceneObjectBase<HomeSceneObjectState> {
  static Component = HomeSceneObjectRenderer;

  onValueChange = (value: number) => {
    this.setState({ counter: value });
  };
}

function HomeSceneObjectRenderer({ model }: SceneComponentProps<HomeSceneObject>) {
  const state = model.useState();

  return (
    <Input
      prefix="Series count"
      defaultValue={state.counter}
      width={20}
      type="number"
      onBlur={(evt) => {
        model.onValueChange(parseInt(evt.currentTarget.value, 10));
      }}
    />
  );
}
