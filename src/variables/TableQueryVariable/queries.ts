import { DataSourceApi } from "@grafana/data";
import { monacoTypes } from "@grafana/ui";


export const fetchSuggestions = async (value: string, range: monacoTypes.IRange, cursorPosition: number, table: string, datasource: DataSourceApi): Promise<monacoTypes.languages.CompletionList> => {
    return {
        suggestions: [],
    };
}