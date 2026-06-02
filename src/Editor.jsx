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
        });

        const lines = formated.split("\n");

        // Pass 1: determine depth for each non-empty line
        // by comparing its original indent with the previous non-empty line
        const depths = new Array(lines.length).fill(0);
        let prevIndent = 0;
        let currentDepth = 0;
        for (let i = 0; i < lines.length; i++) {
            const trimmed = lines[i].trim();
            if (!trimmed) {
                depths[i] = -1; // mark empty
                continue;
            }
            const leadingSpaces = lines[i].length - lines[i].trimStart().length;
            if (leadingSpaces > prevIndent) {
                currentDepth++;
            } else if (leadingSpaces < prevIndent) {
                currentDepth = Math.max(0, currentDepth - 1);
            }
            // equal => depth unchanged
            depths[i] = currentDepth;
            prevIndent = leadingSpaces;
        }

        // Pass 2: re-indent each line using our own indent size
        const result = [];
        for (let i = 0; i < lines.length; i++) {
            const trimmed = lines[i].trim();
            if (!trimmed) {
                result.push("");
            } else {
                result.push(" ".repeat(depths[i] * indent) + trimmed);
            }
        }
        return result.join("\n");
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
                    height="calc(100vh - 100px)"
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
                    height="calc(100vh - 100px)"
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