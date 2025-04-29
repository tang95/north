import { SceneTimeRange } from "@grafana/scenes";

export const createTimeRangeVariable = () => {
    return new SceneTimeRange({
        from: 'now-1h',
        to: 'now',
    });
};
