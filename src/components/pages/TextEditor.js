import React, { Component, Fragment } from "react";
import "trix/dist/trix";
import { TrixEditor } from "react-trix";

export class TextEditor extends Component {
    handleEditorReady(editor) {
        // this is a reference back to the editor if you want to
        // do editing programatically
        editor.insertString("editor is ready");
    }
    handleChange(html, text) {
        // html is the new html content
        // text is the new text content
    }
    render() {
        return (
            <Fragment>
                <TrixEditor
                    onChange={this.handleChange}
                    onEditorReady={this.handleEditorReady}
                />
            </Fragment>
        );
    }
}
