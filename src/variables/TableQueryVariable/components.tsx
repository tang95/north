import { SceneComponentProps } from "@grafana/scenes";
import { CodeEditor, InlineField, Monaco, MonacoEditor, monacoTypes, useTheme2 } from "@grafana/ui";
import { getDataSourceSrv } from "@grafana/runtime";
import React from "react";
import { TableQueryVariable } from "./variable";
import { DataSourceApi, GrafanaTheme2 } from "@grafana/data";
import { css } from "@emotion/css";
import { fetchSuggestions } from "./queries";

const options: monacoTypes.editor.IStandaloneEditorConstructionOptions = {
    fontSize: 14,
    scrollBeyondLastLine: false,
    renderLineHighlight: 'none',
    scrollbar: {
        vertical: 'hidden',
        horizontal: 'hidden',
    },
};

/**
 * 设置编辑器自适应高度
 * @param editor 编辑器实例
 */
const setupEditorAutoResize = (
    editor: MonacoEditor,
) => {
    const handleResize = () => {
        const containerDiv = editor.getDomNode();
        if (!containerDiv) return;
        const contentHeight = editor.getContentHeight();
        editor.layout({
            width: containerDiv.clientWidth,
            height: contentHeight
        });
    };

    editor.onDidContentSizeChange(handleResize);
    handleResize();
};

/**
 * 设置编辑器自动补全
 * @param editor 编辑器实例
 * @param table 表名
 * @param datasourceUid 数据源UID
 */
const setupEditorSuggestions = (editor: MonacoEditor, monaco: typeof monacoTypes, table: string, datasource: Promise<DataSourceApi>) => {
    datasource.then(async datasource => {
        monaco.languages.registerCompletionItemProvider('sql', {
            triggerCharacters: ['.', ' '],
            provideCompletionItems: async (model, position) => {
                const word = model.getWordUntilPosition(position);
                const range: monacoTypes.IRange = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn,
                };

                return await fetchSuggestions(model.getValue(), range, model.getOffsetAt(position), table, datasource);
            },
        });
    });
}

export const TableQueryVariableRenderer = ({ model }: SceneComponentProps<TableQueryVariable>) => {
    const theme = useTheme2();
    const styles = getStyles(theme, 'Enter query conditions... (Press Ctrl + Enter to search)');
    const { table, config, value } = model.useState();
    const datasource = getDataSourceSrv().get(config.datasourceUid);

    const handleRunQuery = (editor: MonacoEditor) => {
        const value = editor.getValue().trim();
        if (value === '') {
            return;
        }
        model.setValue(value);
    };

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

    const handleMount = (editor: monacoTypes.editor.IStandaloneCodeEditor, monaco: typeof monacoTypes) => {
        setupEditorAutoResize(editor);
        setupEditorSuggestions(editor, monaco, table, datasource);
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => handleRunQuery(editor));

        setPlaceholder(monaco, editor)
    };

    return (
        <InlineField label="WHERE" grow>
            <CodeEditor
                value={value || ''}
                language={"sql"}
                onEditorDidMount={handleMount}
                showLineNumbers={false}
                showMiniMap={false}
                monacoOptions={options}
            />
        </InlineField>
    );
}



const getStyles = (theme: GrafanaTheme2, placeholder: string) => {
    return {
        placeholder: css({
            '::after': {
                content: `'${placeholder}'`,
                fontFamily: theme.typography.fontFamilyMonospace,
                opacity: 0.3,
            },
        }),
    };
};
