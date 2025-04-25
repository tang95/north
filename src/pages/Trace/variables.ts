import { TextBoxVariable } from "@grafana/scenes";

export const createLimitVariable = () => {
    return new TextBoxVariable({
        name: "limit",
        label: "Limit",
        description: "Limits the number of rows returned by the query",
        value: "1000"
    });
}
