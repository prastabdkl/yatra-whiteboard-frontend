import React from "react";
import { withRouter } from "react-router-dom";
import { getUserProfile } from "./request";

import App from "./App";

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
                _token: user_details.auth_token,
            });

            getUserProfile().then((res) => {
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
        };
    }

    setGlobal(key, val) {
        if (!key) throw "Can not set global state without key";
        this.setState({ [key]: val });
    }

    render() {
        return (
            <App
                {...this.props}
                {...this.state}
                setGlobal={(key, val) => this.setGlobal(key, val)}
            />
        );
    }
}

export default withRouter(Root);
