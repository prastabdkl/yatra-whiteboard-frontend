import React from "react";
import { TextEditor } from "../pages";

export function HomePage(props) {
    return (
        <div className="ui container">
            <div class="ui fluid placeholder segment">
                <div class="ui icon header">
                    <i class="home icon"></i>
                    Home Page
                </div>
            </div>
            <TextEditor></TextEditor>
        </div>
    );
}
