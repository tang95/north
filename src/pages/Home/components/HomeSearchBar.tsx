import { Button, Combobox, Icon, Input, Stack } from '@grafana/ui';
import React from 'react';

export type HomeSearchBarProps = {
    namespaceList: string[];
    sortKey: string;
    sortOrder: string;
    keyword: string;
    namespace: string;
    onNamespaceChange: (namespace: string) => void;
    onSortKeyChange: (sortKey: string) => void;
    onSortOrderChange: (sortOrder: 'asc' | 'desc') => void;
    onKeywordChange: (keyword: string) => void;
}

const sortOptions = [
    { value: 'total', label: 'Sort by Total Count' },
    { value: 'errors', label: 'Sort by Error Count' },
    { value: 'successRate', label: 'Sort by Success Rate' },
];

const HomeSearchBar = ({ namespaceList, namespace, sortKey, sortOrder, keyword, onNamespaceChange, onSortKeyChange, onSortOrderChange, onKeywordChange }: HomeSearchBarProps) => {
    const namespaceOptions = [{ value: 'all', label: 'All' }, ...namespaceList.map((namespace) => ({ value: namespace, label: namespace }))];

    return (
        <Stack width={"100%"}>
            <Combobox
                options={namespaceOptions}
                onChange={(option) => {
                    onNamespaceChange(option?.value || 'all');
                }}
                value={namespaceOptions.find(option => option.value === namespace) || namespaceOptions[0]}
                placeholder='Select namespace to filter'
            />
            <Input
                prefix={<Icon name="search" />}
                value={keyword}
                onChange={(e) => onKeywordChange(e.currentTarget.value)}
                placeholder="Search by service name or trace ID..."
            />
            <Combobox
                options={sortOptions}
                onChange={(option) => {
                    if (option?.value) {
                        onSortKeyChange(option.value);
                    }
                }}
                value={sortOptions.find(option => option.value === sortKey) || sortOptions[0]}
                width={23}
                placeholder='Select sorting criteria'
            />
            <Button
                variant="secondary"
                onClick={() => {
                    onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc');
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
}

export default HomeSearchBar;
