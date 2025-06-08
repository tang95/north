import { SceneComponentProps } from "@grafana/scenes";
import { CodeEditor, InlineField, Monaco, MonacoEditor, monacoTypes, useTheme2 } from "@grafana/ui";
import React from "react";
import { TableQueryVariable } from "./variable";
import { GrafanaTheme2 } from "@grafana/data";
import { css } from "@emotion/css";

const options: monacoTypes.editor.IStandaloneEditorConstructionOptions = {
    fontSize: 14,
    scrollBeyondLastLine: false,
    renderLineHighlight: 'none',
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


export const TableQueryVariableRenderer = ({ model }: SceneComponentProps<TableQueryVariable>) => {
    const theme = useTheme2();
    const styles = getStyles(theme, 'Enter query conditions... (Press Ctrl + Enter to search)');

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
        // const me = registerSQL('sql', editor, _getSuggestions);
        setupEditorAutoResize(editor);

        editor.addAction({
            id: 'run-query',
            label: 'Run Query',
            keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
            run: (editor: monacoTypes.editor.IStandaloneCodeEditor) => {
                console.log(editor.getValue());
                // saveChanges({ rawSql: editor.getValue() });
                // props.onRunQuery();
            },
        });

        setPlaceholder(monaco, editor)
    };

    return (
        <InlineField label="WHERE" grow>
            <CodeEditor
                value={""}
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
