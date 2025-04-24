import { SceneComponentProps, SceneObjectBase, SceneObjectState, TextBoxVariable, SceneVariableValueChangedEvent } from '@grafana/scenes';
import { Button, Combobox, Icon, Input, Stack } from '@grafana/ui';
import React, { useState } from 'react';
import { debounce } from 'lodash';

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
  sortKeyVar: TextBoxVariable;
  sortOrderVar: TextBoxVariable;
  namespaceVar: TextBoxVariable;
  keywordVar: TextBoxVariable;
}

export class HomeSearchSceneObject extends SceneObjectBase<HomeSearchSceneObjectState> {
  static Component = ({ model }: SceneComponentProps<HomeSearchSceneObject>) => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedNamespace, setSelectedNamespace] = useState<string>('all');
    const [selectedSort, setSelectedSort] = useState<string>('successRate');

    const handleKeywordChange = debounce((text: string) => model.onKeywordVarChange(text), 500);

    return (
      <Stack width={"100%"}>
        <Combobox
          options={namespaceOptions}
          onChange={(option) => {
            setSelectedNamespace(option?.value || 'all');
            model.onNamespaceChange(option?.value || 'all');
          }}
          value={selectedNamespace}
          placeholder='Select namespace to filter'
        />
        <Input
          prefix={<Icon name="search" />}
          onChange={(e) => handleKeywordChange(e.currentTarget.value)}
          placeholder="Search by service name or trace ID..."
        />
        <Combobox
          options={sortOptions}
          onChange={(option) => {
            if (option.value) {
              setSelectedSort(option.value);
              model.onSortKeyChange(option.value);
            }
          }}
          value={selectedSort}
          width={23}
          placeholder='Select sorting criteria'
        />
        <Button
          variant="secondary"
          onClick={() => {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            model.onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc');
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

  onKeywordVarChange = (text: string) => {
    this.state.keywordVar.setState({ value: text });
    this.publishEvent(new SceneVariableValueChangedEvent(this.state.keywordVar), true);
  };

  onNamespaceChange = (namespace: string) => {
    this.state.namespaceVar.setState({ value: namespace });
    this.publishEvent(new SceneVariableValueChangedEvent(this.state.namespaceVar), true);
  };

  onSortOrderChange = (sortOrder: 'asc' | 'desc') => {
    this.state.sortOrderVar.setState({ value: sortOrder });
    this.publishEvent(new SceneVariableValueChangedEvent(this.state.sortOrderVar), true);
  };

  onSortKeyChange = (sortKey: string) => {
    this.state.sortKeyVar.setState({ value: sortKey });
    this.publishEvent(new SceneVariableValueChangedEvent(this.state.sortKeyVar), true);
  }
}
