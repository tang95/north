import { TextBoxVariable } from "@grafana/scenes";


export const createNamespaceVariable = () => {
    return new TextBoxVariable({
        name: 'namespace'
    });
}

export const createSortKeyVariable = () => {
    return new TextBoxVariable({
        name: 'sortKey'
    });
}

export const createSortOrderVariable = () => {
    return new TextBoxVariable({
        name: 'sortOrder'
    });
}

export const createKeywordVariable = () => {
    return new TextBoxVariable({
        name: 'keyword'
    });
}
