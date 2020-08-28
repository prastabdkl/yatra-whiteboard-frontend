import React, { useState, useEffect, Fragment } from "react";
import { TextEditor } from "../pages";
import { CanvasEditor } from "../pages";
import { Segment, Card, Grid, Button, Dropdown } from "semantic-ui-react";
import { getBoardDetails } from "../../request";

export function BoardDetails(props) {
    const [sections, setSections] = useState([]);
    const [addingSection, setAddingSection] = useState(false);
    debugger;

    useEffect(() => {
        if (props.match.params.idx !== undefined) {
            getBoardDetails().then((v) => {
                debugger;
            });
        } else {
            setSections([...sections, { "text-editor": true }]);
        }
    }, []);

    return (
        <div className="ui container">
            <h3 className="ui header">Text Editor</h3>

            {sections.map((section, index) => {
                if (section["text-editor"]) {
                    return (
                        <Fragment>
                            <Grid stackable columns={2}>
                                <Grid.Column floated="right" width={12}>
                                    <Button
                                        basic
                                        color="red"
                                        className="right floated"
                                        onClick={() => {
                                            var array = sections;
                                            array = array.splice(index, 1);
                                            setSections(array);
                                        }}
                                    >
                                        X
                                    </Button>
                                </Grid.Column>
                            </Grid>
                            <Card fluid>
                                <Card.Content>
                                    <TextEditor></TextEditor>
                                </Card.Content>
                            </Card>
                        </Fragment>
                    );
                } else if (section["canvas-editor"]) {
                    return (
                        <Fragment>
                            <Grid stackable columns={2}>
                                <Grid.Column floated="right" width={12}>
                                    <Button
                                        basic
                                        color="red"
                                        className="right floated"
                                        onClick={() => {
                                            setSections(
                                                sections.splice(index, 1)
                                            );
                                        }}
                                    >
                                        X
                                    </Button>
                                </Grid.Column>
                            </Grid>
                            <Card fluid>
                                <Card.Content>
                                    <CanvasEditor></CanvasEditor>
                                </Card.Content>
                            </Card>
                        </Fragment>
                    );
                } else {
                    return <Segment fluid placeholder></Segment>;
                }
            })}
            <Grid stackable columns={2}>
                <Grid.Column className="text-center" width={12}>
                    {addingSection && (
                        <Button
                            basic
                            size="massive"
                            color="green"
                            className="center aligned"
                            onClick={() => setAddingSection(true)}
                        >
                            Add Section
                        </Button>
                    )}

                    {!addingSection && (
                        <Button.Group size="huge">
                            <Button
                                basic
                                color="teal"
                                onClick={() => {
                                    setSections([
                                        ...sections,
                                        { "text-editor": true },
                                    ]);
                                    setAddingSection(false);
                                }}
                            >
                                Add Text Editor
                            </Button>
                            <Button
                                basic
                                color="teal"
                                onClick={() => {
                                    setSections([
                                        ...sections,
                                        { "canvas-editor": true },
                                    ]);
                                    setAddingSection(false);
                                }}
                            >
                                Add Canvas
                            </Button>
                        </Button.Group>
                    )}
                </Grid.Column>
            </Grid>
        </div>
    );
}
