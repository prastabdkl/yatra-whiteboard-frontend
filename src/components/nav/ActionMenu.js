import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { clearLocalStorage } from "../../misc";

import styles from "./ActionMenu.module.css";

class ActionMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { loggedIn, setGlobal, history } = this.props;
        return (
            <Fragment>
                {!loggedIn && (
                    <span
                        className="large link component"
                        onClick={() => {
                            setGlobal("_token", undefined);
                            history.push("/login");
                        }}
                    >
                        Login
                    </span>
                )}
                {loggedIn && (
                    <Dropdown item text="Account" className="component">
                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={() => {
                                    history.push(`/profile/`);
                                }}
                            >
                                <i className="user large link icon" />
                                Profile
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    setGlobal("_token", undefined);
                                    clearLocalStorage();
                                    history.push("/login");
                                }}
                            >
                                <i className="sign out large link icon" />{" "}
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </Fragment>
        );
    }
}

export { ActionMenu };
