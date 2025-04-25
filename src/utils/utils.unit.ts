import { formattedValueToString, getValueFormat } from "@grafana/data";

export const formatPercentValue = (value: number) => {
    const format = getValueFormat('percentunit');
    return formattedValueToString(format(value));
}

export const formatShortValue = (value: number) => {
    const format = getValueFormat('short');
    return formattedValueToString(format(value));
}
