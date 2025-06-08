import { SceneObjectBase, SceneObjectUrlSyncConfig, SceneObjectUrlValues, SceneVariable, SceneVariableState, SceneVariableValueChangedEvent, ValidateAndUpdateResult, VariableValue } from "@grafana/scenes";
import { Observable, of } from "rxjs";
import { ConfigProps } from "../../components/AppConfig/AppConfig";
import { TableQueryVariableRenderer } from "./components";

interface TableQueryVariableState extends SceneVariableState {
    table: string;
    value?: string;
    config: ConfigProps;
}


export class TableQueryVariable extends SceneObjectBase<TableQueryVariableState> implements SceneVariable<TableQueryVariableState> {
    static Component = TableQueryVariableRenderer;
    protected _urlSync = new SceneObjectUrlSyncConfig(this, { keys: () => [this.getKey()] });

    public getValue(): VariableValue {
        return this.state.value ?? '';
    }

    public setValue(newValue: string) {
        if (newValue !== this.state.value) {
            this.setState({ value: newValue });
            this.publishEvent(new SceneVariableValueChangedEvent(this), true);
        }
    }

    private getKey(): string {
        return `var-${this.state.name}`;
    }

    public getUrlState() {
        return { [this.getKey()]: this.state.value };
    }

    public updateFromUrl(values: SceneObjectUrlValues) {
        const val = values[this.getKey()];

        if (typeof val === 'string') {
            this.setValue(val);
        }
    }

    validateAndUpdate(): Observable<ValidateAndUpdateResult> {
        return of({ value: this.state.value });
    }

    getValueText?(fieldPath?: string): string {
        return this.state.value ?? '';
    }

    isAncestorLoading?(): boolean {
        return false;
    }

    onCancel?(): void {
        return;
    }
}

