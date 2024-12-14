"use client";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";

import { useRef, useState } from "react";
import SelectButton from "./SelectButton";
import ClickButton from "./ClickButton";
import { addSubmission } from "@/app/lib/codingAction";

export default function CodeEditor({ id }) {
    const editorRef = useRef();
    const currentCodeRef = useRef();
    const [currentLanguage, setCurrentLanguage] = useState(options[0].toLowerCase());
    const [currentTheme, setCurrentTheme] = useState(themes[0].toLowerCase());
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onChangeCode = (value) => {
        currentCodeRef.current = value;
    };

    const onMountEditor = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    const onChangeLanguage = (language) => {
        setCurrentLanguage(language);
    };

    const onChangeTheme = (theme) => {
        setCurrentTheme(theme);
    };

    const onSubmitCode = () => {
        setIsSubmitting(true);
        setTimeout(async () => {
            const result = await addSubmission(currentLanguage, currentCodeRef.current, id);
            setIsSubmitting(false);
        }, 2000);
    };

    return (
        <div className="h-full">
            <div className="flex gap-2">
                <SelectButton options={options} onChangeValue={onChangeLanguage} />
                <SelectButton options={themes} onChangeValue={onChangeTheme} />
            </div>
            <AceEditor
                mode={currentLanguage}
                theme={currentTheme}
                onChange={onChangeCode}
                value={currentCodeRef.current}
                onLoad={onMountEditor}
                width="100%"
                height="80%"
                wrapEnabled={true}
                showGutter={true}
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableSnippets: true,
                    showPrintMargin: false,
                    useWorker: false,
                    tabSize: 4,
                }}
                className="rounded mt-4 mb-4 border border-gray-300"
                lineHeight={24}
                fontSize="0.8rem"
                placeholder={"Write your code here"}
            />
            <div className="flex gap-2 justify-end">
                <ClickButton name="Reset" onClick={() => editorRef.current.setValue("")} />
                <ClickButton name="Run" isPrimary={true} isSubmitting={isSubmitting} onClick={onSubmitCode} />
            </div>
        </div>
    );
}

const options = ["Javascript", "Python"];
const themes = ["Monokai", "Github", "Tomorrow", "Terminal", "Xcode"];
