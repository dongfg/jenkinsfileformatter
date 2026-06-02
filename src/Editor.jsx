import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import Editor from '@monaco-editor/react';
import * as prettier from "prettier";
import * as groovyPlugin from "prettier-plugin-groovy";
import styles from './Editor.module.css';

const MyEditor = forwardRef(function MyEditor({ indent = 2 }, ref) {
    const inputEditorRef = useRef(null);
    const outputEditorRef = useRef(null);
    const inputContentRef = useRef("");

    const formatCode = async (code) => {
        const formated = await prettier.format(code, {
            parser: "groovy",
            plugins: [groovyPlugin],
        })
        const lines = formated.split("\n");
        let currentIndent = 2;
        for (let index = 0; index < lines.length; index++) {
            const line = lines[index];
            if (line.startsWith(" ".repeat(4))) {
                currentIndent = 4;
                break;
            }
            if (line.startsWith(" ".repeat(2))) {
                currentIndent = 2;
                break;
            }
        }
        if (currentIndent === indent) {
            return formated;
        }
        const indentRegex = /^ +/
        const indented = [];
        for (let index = 0; index < lines.length; index++) {
            const line = lines[index];
            const found = line.match(indentRegex);
            if (found) {
                const blankSize = found[0].length;
                if (currentIndent == 2) { // 2 ==> 4
                    indented.push(line.replace(new RegExp("^" + found[0]), " ".repeat(blankSize * 2)))
                } else { // 4 ==> 2
                    indented.push(line.replace(new RegExp("^" + found[0]), " ".repeat(blankSize / 2)))
                }
            } else {
                indented.push(line);
            }
        }
        return indented.join("\n")
    };

    const handleFormat = async () => {
        const code = inputContentRef.current;
        if (!code || !outputEditorRef.current) return;
        const formatted = await formatCode(code);
        outputEditorRef.current.setValue(formatted);
        localStorage.setItem("content", code);
    };

    useImperativeHandle(ref, () => ({
        format: handleFormat,
    }));

    // Re-format when indent changes
    useEffect(() => {
        if (outputEditorRef.current && inputContentRef.current) {
            handleFormat();
        }
    }, [indent]);

    useEffect(() => {
        return () => {
            if (inputEditorRef.current) {
                inputEditorRef.current.dispose();
            }
            if (outputEditorRef.current) {
                outputEditorRef.current.dispose();
            }
        };
    }, []);

    const handleInputChange = (newValue) => {
        inputContentRef.current = newValue;
        localStorage.setItem("content", newValue);
    };

    const handleInputMount = (editor) => {
        inputEditorRef.current = editor;
        const historyContent = localStorage.getItem("content") || "";
        editor.setValue(historyContent);
        inputContentRef.current = historyContent;
    };

    const handleOutputMount = (editor) => {
        outputEditorRef.current = editor;
    };

    return (
        <div className={styles.editorContainer}>
            <div className={styles.panel}>
                <div className={styles.panelTitle}>Input</div>
                <Editor
                    height="calc(100vh - 72px)"
                    width="100%"
                    language="tcl"
                    onMount={handleInputMount}
                    onChange={handleInputChange}
                    theme="vs-dark"
                />
            </div>
            <div className={styles.panel}>
                <div className={styles.panelTitle}>Output</div>
                <Editor
                    height="calc(100vh - 72px)"
                    width="100%"
                    language="tcl"
                    onMount={handleOutputMount}
                    theme="vs-dark"
                    options={{ readOnly: true }}
                />
            </div>
        </div>
    );
});

export default MyEditor;