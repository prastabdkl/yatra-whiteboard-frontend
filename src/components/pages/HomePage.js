import React, { useState, useEffect } from "react";
import { TextEditor } from "../pages";
import { CanvasEditor } from "./CanvasEditor";
import { Segment, Card } from "semantic-ui-react";

export function HomePage(props) {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        setSections([
            ...sections,
            { "text-editor": true },
            { "canvas-editor": true },
            { "canvas-editor": true },
        ]);
    }, []);
    return (
        <div className="ui container">
            <h3 className="ui header">Text Editor</h3>

            {sections.map((section) => {
                if (section["text-editor"]) {
                    return (
                        <Card fluid>
                            <Card.Content>
                                <TextEditor></TextEditor>
                            </Card.Content>
                        </Card>
                    );
                } else if (section["canvas-editor"]) {
                    return (
                        <Card fluid>
                            <Card.Content>
                                <CanvasEditor></CanvasEditor>
                            </Card.Content>
                        </Card>
                    );
                } else {
                    return <Segment fluid placeholder></Segment>;
                }
            })}
        </div>
    );
}
