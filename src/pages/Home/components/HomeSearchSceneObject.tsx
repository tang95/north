import { SceneComponentProps, SceneObjectBase, SceneObjectState } from '@grafana/scenes';
import { Button, Combobox, Icon, Input, Stack } from '@grafana/ui';
import React, { useState } from 'react';

const languageOptions = [
  { value: 'all', label: 'All' },
  { value: 'cpp', label: 'C++' },
  { value: 'dotnet', label: 'C#' },
  { value: 'erlang', label: 'Erlang' },
  { value: 'go', label: 'Go' },
  { value: 'java', label: 'Java' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'php', label: 'PHP' },
  { value: 'python', label: 'Python' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'rust', label: 'Rust' },
  { value: 'swift', label: 'Swift' },
  { value: 'webjs', label: 'WebJS' },
];

const sortOptions = [
  { value: 'successRate', label: 'Sort by Success Rate' },
  { value: 'eventCount', label: 'Sort by Event Count' },
  { value: 'errorCount', label: 'Sort by Error Count' },
];

interface HomeSearchSceneObjectState extends SceneObjectState {
}

export class HomeSearchSceneObject extends SceneObjectBase<HomeSearchSceneObjectState> {
  static Component = ({ model }: SceneComponentProps<HomeSearchSceneObject>) => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
    const [selectedSort, setSelectedSort] = useState<string>('successRate');

    return (
      <Stack width={"100%"}>
        <Combobox
          options={languageOptions}
          onChange={(option) => setSelectedLanguage(option?.value || 'all')}
          value={languageOptions.find(option => option.value === selectedLanguage)}
          placeholder='Select Language'
        />
        <Input
          prefix={<Icon name="search" />}
          style={{ width: '100%' }}
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
}
