import { css } from '@emotion/css';
import { GrafanaTheme2, VariableHide } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { SceneComponentProps, SceneObjectBase, SceneObjectState, SceneObjectUrlSyncConfig, SceneObjectUrlValues, SceneVariable, SceneVariableValueChangedEvent, ValidateAndUpdateResult, VariableValue } from "@grafana/scenes";
import { Monaco, MonacoEditor, monacoTypes, ReactMonacoEditor, useTheme2 } from '@grafana/ui';
import { ConfigProps } from "components/AppConfig/AppConfig";
import React, { useRef } from 'react';
import { Observable, of } from 'rxjs';

interface MetricQueryVariableState extends SceneObjectState {
    config: ConfigProps;
    type: 'textbox';
    hide?: VariableHide;
    name: string;
    value: string;
}

const EDITOR_HEIGHT_OFFSET = 2;

const options: monacoTypes.editor.IStandaloneEditorConstructionOptions = {
    codeLens: false,
    contextmenu: false,
    // we need `fixedOverflowWidgets` because otherwise in grafana-dashboards
    // the popup is clipped by the panel-visualizations.
    fixedOverflowWidgets: true,
    folding: false,
    fontSize: 14,
    lineDecorationsWidth: 8, // used as "padding-left"
    lineNumbers: 'off',
    minimap: { enabled: false },
    overviewRulerBorder: false,
    overviewRulerLanes: 0,
    padding: {
        // these numbers were picked so that visually this matches the previous version
        // of the query-editor the best
        top: 4,
        bottom: 5,
    },
    language: 'json',
    renderLineHighlight: 'none',
    scrollbar: {
        vertical: 'hidden',
        verticalScrollbarSize: 8, // used as "padding-right"
        horizontal: 'hidden',
        horizontalScrollbarSize: 0,
        alwaysConsumeMouseWheel: false,
    },
    scrollBeyondLastLine: false,
    suggest: {
        showWords: false,
    },
    suggestFontSize: 12,
    wordWrap: 'on',
};

const MetricQueryVariableRenderer = ({ model }: SceneComponentProps<MetricQueryVariable>) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const theme = useTheme2();
    const styles = getStyles(theme, 'Enter query conditions... (Press Shift + Enter to search)');

    const setPlaceholder = (monaco: Monaco, editor: MonacoEditor) => {
        const placeholderDecorators = [
            {
                range: new monaco.Range(1, 1, 1, 1),
                options: {
                    className: styles.placeholder,
                    isWholeLine: true,
                },
            },
        ];

        let decorators: string[] = [];

        const checkDecorators: () => void = () => {
            const model = editor.getModel();
            if (!model) {
                return;
            }
            const newDecorators = model.getValueLength() === 0 ? placeholderDecorators : [];
            decorators = model.deltaDecorations(decorators, newDecorators);
        };

        checkDecorators();
        editor.onDidChangeModelContent(checkDecorators);
    };

    return (
        <div
            data-testid={selectors.components.QueryField.container}
            className={styles.container}
            ref={containerRef}
        >
            <ReactMonacoEditor
                value={model.state.value}
                options={options}
                onMount={(editor, monaco) => {
                    const handleResize = () => {
                        const containerDiv = containerRef.current;
                        if (containerDiv !== null) {
                            const pixelHeight = editor.getContentHeight();
                            containerDiv.style.height = `${pixelHeight + EDITOR_HEIGHT_OFFSET}px`;
                            const pixelWidth = containerDiv.clientWidth;
                            editor.layout({ width: pixelWidth, height: pixelHeight });
                        }
                    };

                    editor.onDidContentSizeChange(handleResize);
                    handleResize();

                    // Add keyboard shortcut for Shift + Enter
                    editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Enter, () => {
                        const editorModel = editor.getModel();
                        if (!editorModel) {
                            return;
                        }
                        const query = editorModel.getValue();
                        model.setValue(query);
                    });

                    setPlaceholder(monaco, editor);
                }}
            />
        </div>
    );
}

const getStyles = (theme: GrafanaTheme2, placeholder: string) => {
    return {
        container: css({
            borderRadius: theme.shape.radius.default,
            border: `1px solid ${theme.components.input.borderColor}`,
            width: '100%',
            flexGrow: 1,
            '.monaco-editor .suggest-widget': {
                minWidth: '50%',
            },
            overflow: 'hidden',
        }),
        placeholder: css({
            '::after': {
                content: `'${placeholder}'`,
                fontFamily: theme.typography.fontFamilyMonospace,
                opacity: 0.3,
            },
        }),
    };
};

export class MetricQueryVariable extends SceneObjectBase<MetricQueryVariableState> implements SceneVariable<MetricQueryVariableState> {
    static Component = MetricQueryVariableRenderer;
    protected _urlSync = new SceneObjectUrlSyncConfig(this, { keys: () => [this.getKey()] });
    public constructor(initialState: Partial<MetricQueryVariableState>) {
        super({
            ...initialState,
            type: 'textbox',
            value: '',
            config: initialState.config!,
            name: initialState.name!,
        });
    }
    public getValue(): VariableValue {
        return this.state.value;
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
        return this.state.value;
    }

    isAncestorLoading?(): boolean {
        return false;
    }

    onCancel?(): void {
        return;
    }
}

