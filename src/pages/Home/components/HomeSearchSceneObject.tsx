import { SceneComponentProps, SceneObjectBase, SceneObjectState, SceneVariableValueChangedEvent, TextBoxVariable } from '@grafana/scenes';
import { Button, Combobox, Icon, Input, Stack } from '@grafana/ui';
import React, { useState } from 'react';

const namespaceOptions = [
  { value: 'all', label: 'All' },
  { value: 'default', label: 'Default' },
  { value: 'kube-system', label: 'Kube System' },
  { value: 'monitoring', label: 'Monitoring' },
  { value: 'istio-system', label: 'Istio System' },
  { value: 'cert-manager', label: 'Cert Manager' },
  { value: 'ingress-nginx', label: 'Ingress Nginx' },
];

const sortOptions = [
  { value: 'successRate', label: 'Sort by Success Rate' },
  { value: 'eventCount', label: 'Sort by Event Count' },
  { value: 'errorCount', label: 'Sort by Error Count' },
];

interface HomeSearchSceneObjectState extends SceneObjectState {
  textVar: TextBoxVariable;
}

export class HomeSearchSceneObject extends SceneObjectBase<HomeSearchSceneObjectState> {
  static Component = ({ model }: SceneComponentProps<HomeSearchSceneObject>) => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedNamespace, setSelectedNamespace] = useState<string>('all');
    const [selectedSort, setSelectedSort] = useState<string>('successRate');

    return (
      <Stack width={"100%"}>
        <Combobox
          options={namespaceOptions}
          onChange={(option) => setSelectedNamespace(option?.value || 'all')}
          value={namespaceOptions.find(option => option.value === selectedNamespace)}
          placeholder='Select Namespace'
        />
        <Input
          prefix={<Icon name="search" />}
          style={{ width: '100%' }}
          defaultValue={model.state.textVar.getValue().toString()}
          onChange={(e) => model.onTextChange(e.currentTarget.value)}
          placeholder="Search services or enter Trace ID..."
        />
        <Combobox
          options={sortOptions}
          value={sortOptions.find(option => option.value === selectedSort)}
          onChange={(option) => setSelectedSort(option?.value || 'successRate')}
          placeholder='Sort'
          width={23}
        />
        <Button
          variant="secondary"
          onClick={() => {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
          }}
        >
          <Icon
            name="sort-amount-down"
            style={{
              transform: sortOrder === 'asc' ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s ease'
            }} />
        </Button>
      </Stack>
    );
  };

  onTextChange = (text: string) => {
    this.state.textVar.setState({ value: text });
    this.publishEvent(new SceneVariableValueChangedEvent(this.state.textVar), true);
  };
}
