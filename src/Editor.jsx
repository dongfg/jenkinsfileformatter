import React, { useRef, useEffect, useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import * as prettier from "prettier";
import * as groovyPlugin from "prettier-plugin-groovy";

function MyEditor({ indent = 2 }) {
    const editorRef = useRef(null);
    const timerRef = useRef(null);
    const formattedContentRef = useRef("");

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
        if (currentIndent !== indent) {
            // 2 => 4
            if (currentIndent === 2) {
                return formated.replaceAll(" ".repeat(2), " ".repeat(4));
            }
            // 4 => 2
            return formated.replaceAll(" ".repeat(4), " ".repeat(2));
        }
        return formated
    };

    const formatAndSetValue = async (newValue) => {
        const formattedContent = await formatCode(newValue);
        formattedContentRef.current = formattedContent;

        if (formattedContent !== newValue) {
            editorRef.current.setValue(formattedContent)
            localStorage.setItem("content", formattedContent)
        }
    }

    const handleEditorChange = (newValue, event) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(async () => {
            formatAndSetValue(newValue)
        }, 500);

    };


    useEffect(() => {
        return () => {
            if (editorRef.current) {
                // 清理事件监听器
                editorRef.current.dispose();
            }
        };
    }, []);

    useEffect(() => {
        if (!editorRef.current) {
            return;
        }
        formatAndSetValue(formattedContentRef.current);
    }, [indent])

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        const historyContent = localStorage.getItem("content") || ""
        editorRef.current.setValue(historyContent);
        formattedContentRef.current = historyContent;
    };

    return (
        <div>
            <Editor
                height="calc(100vh - 48px)"
                width="100vw"
                language="tcl"
                onMount={handleEditorDidMount}
                onChange={handleEditorChange}
            />
        </div>
    );
}

export default MyEditor;