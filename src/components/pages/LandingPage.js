import React, { useState } from "react";
import "../../stylesheet/sites.css";
import { Grid, Image } from "semantic-ui-react";
import { Login } from "../auth";
// import school from "../../images/school.jpg";
// import text-editor from "../../images/text-editor.gif";

import { Button, Icon } from "semantic-ui-react";

export function LandingPage(props) {
    const [gettingStarted, setGettingStarted] = useState(false);
    return (
        <div>
            <div className="container-fluid ">
                <Grid>
                    <Grid.Row verticalAlign="middle" centered>
                        <Grid.Column className="five wide computer sixteen wide mobile center aligned">
                            <h1>Classroom Teaching made easy</h1>
                            <Button
                                animated="fade"
                                id="#get-started-button"
                                size="massive"
                                color="violet"
                                onClick={() => setGettingStarted(true)}
                            >
                                <Button.Content visible>
                                    Get Started
                                </Button.Content>
                                <Button.Content hidden>Login</Button.Content>
                            </Button>
                            {gettingStarted && <Login {...props}></Login>}
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <Image fluid src="../../images/school.jpg" />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={11}>
                            {/* <Image fluid src="../../images/school-copy.jpg" /> */}
                            {/* <Image fluid src="../../images/text-editor.gif" /> */}
                            <Image fluid src="../../images/text-editor.png" />
                            {/* <Image fluid src="../../images/test.gif" /> */}
                        </Grid.Column>
                        <Grid.Column
                            width={5}
                            verticalAlign="middle"
                            centered
                            className="center aligned"
                        >
                            <h1>Show and Edit texts with ease</h1>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {/* <img alt="timer" src={require("../../images/school.jpg")} /> */}
            </div>
            <div>
                <Button
                    animated="fade"
                    id="#get-started-button"
                    size="large"
                    color="violet"
                >
                    <Button.Content visible>Get Started</Button.Content>
                    <Button.Content hidden>Create a board</Button.Content>
                </Button>
            </div>
        </div>
    );
}
