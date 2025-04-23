import { CustomVariable } from "@grafana/scenes";


export const createSortKeyVariable = () => {
    const sortOptions = [
        { value: 'successRate', label: 'Sort by Success Rate' },
        { value: 'eventCount', label: 'Sort by Event Count' },
        { value: 'errorCount', label: 'Sort by Error Count' },
    ];


    return new CustomVariable({
        name: 'sortKey',
        query: `${sortOptions.map(option => `${option.label} : ${option.value}`).join(', ')}`
    });
}