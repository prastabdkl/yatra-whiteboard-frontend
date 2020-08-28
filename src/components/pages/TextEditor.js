import React, { Component, Fragment, useState, useCallback } from "react";
import "trix/dist/trix";
import { TrixEditor } from "react-trix";

import { Menu } from "semantic-ui-react";

// The editor core
import Editor from "@react-page/editor";
import "@react-page/core/lib/index.css"; // we also want to load the stylesheets
// Require editor ui stylesheet
import "@react-page/ui/lib/index.css";

// Load some exemplary plugins:
import slate from "@react-page/plugins-slate"; // The rich text area plugin
import "@react-page/plugins-slate/lib/index.css"; // Stylesheets for the rich text area plugin
import background from "@react-page/plugins-background"; // A plugin for background images
import "@react-page/plugins-background/lib/index.css"; // Stylesheets for  background layout plugin

// Define which plugins we want to use. We only have slate and background available, so load those.
const plugins = {
    content: [slate()], // Define plugins for content cells. To import multiple plugins, use [slate(), image, spacer, divider]
    layout: [background({ defaultPlugin: slate() })], // Define plugins for layout cells
};

const $ = window.$;

export const TextEditor = () => {
    const [editorValue, setEditorValue] = useState();
    const [content, setContent] = useState();
    const [language, setLanguage] = useState();

    const copyToClipboard = (str) => {
        const el = document.createElement("textarea");
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.body.removeChild(el);
    };

    const handleEditorReady = (editor) => {
        // this is a reference back to the editor if you want to
        // do editing programatically
        editor.insertString("editor is ready");
    };
    const handleChange = (html, text) => {
        // html is the new html content
        // text is the new text content
        setContent(html);
    };

    return (
        <Fragment>
            <Menu>
                <Menu.Item
                    onClick={() =>
                        setLanguage(language == "nepali" ? "" : "nepali")
                    }
                >
                    <div>
                        <i className="sliders horizontal link icon" /> Nepali
                    </div>
                </Menu.Item>
            </Menu>
            <TrixEditor onChange={handleChange}></TrixEditor>

            {/* <Editor
                plugins={plugins}
                defaultPlugin={slate()}
                value={editorValue}
                onChange={setEditorValue}
            /> */}
            <div className={language !== "nepali" ? "invisible" : ""}>
                <a
                    rel="nofollow"
                    href="http://naya.com.np"
                    title="Nepali Social Network"
                    class="naya_convert"
                ></a>
                <textarea id="english-to-nepali"></textarea>

                <button
                    className="ui primary"
                    onClick={() => {
                        $("#english-to-nepali").select();
                        document.execCommand("copy");
                    }}
                >
                    Copy
                </button>
            </div>
        </Fragment>
    );
};
