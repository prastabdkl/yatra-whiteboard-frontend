import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { getUserProfile } from "./request";

import App from "./App";
import { Form, Modal, Button } from "semantic-ui-react";

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState();
    }

    componentDidMount() {
        this.props.history.listen((location, action) => {
            this.setGlobal("_section", this.props.location.hash);

            console.log("location", location, action, this.props);
            if (location.pathname != this.props.location.pathname)
                this.setState({ _sidebar: false });
        });

        const user_details = JSON.parse(localStorage.getItem("_user-details"));
        if (user_details != undefined) {
            this.setState({
                _token: user_details.key,
            });

            getUserProfile().then((res) => {
                debugger;
                if (res.success) {
                    this.setState({
                        _user: res.data,
                    });
                }
            });
        }
    }

    initialState() {
        return {
            _user: {},
            _token: null,
            _sidebar: false,
            _section: "",
            _creatingBoard: false,
        };
    }

    setGlobal(key, val) {
        if (!key) throw "Can not set global state without key";
        this.setState({ [key]: val });
    }

    render() {
        return (
            <Fragment>
                <App
                    {...this.props}
                    {...this.state}
                    setGlobal={(key, val) => this.setGlobal(key, val)}
                />
                <Modal
                    size="mini"
                    open={this.state._creatingBoard}
                    onClose={() =>
                        this.setState({
                            _creatingBoard: false,
                        })
                    }
                >
                    <Modal.Header>Enter your board name</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Group inline>
                                <Form.Field>
                                    <Form.Input type="text"></Form.Input>
                                </Form.Field>
                                <Button
                                    type="submit"
                                    className="ui basic primary button"
                                >
                                    Submit
                                </Button>
                            </Form.Group>
                        </Form>
                    </Modal.Content>
                </Modal>
            </Fragment>
        );
    }
}

export default withRouter(Root);
