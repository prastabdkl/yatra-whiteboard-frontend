import React from "react";
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
            <div>
                <Dropdown item text="Account" className="component">
                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick={() => {
                                history.push(`/profile`);
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
                            <i className="sign out large link icon" /> Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
}

export { ActionMenu };
