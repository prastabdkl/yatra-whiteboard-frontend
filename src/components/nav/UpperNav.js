import React from "react";

import styles from "./UpperNav.module.css";
import { ActionMenu } from "./ActionMenu";

export function UpperNav(props) {
    const { loggedIn, setGlobal, history } = props;

    return (
        <div className="ui fixed top attached inverted menu" id="UpperNav">
            <div
                className="item"
                id="navSwitcher"
                onClick={() => props.setGlobal("_sidebar", !props._sidebar)}
            >
                <i className="bars link large icon"></i>
            </div>
            <div
                className="item"
                id="projectLogo"
                onClick={() => props.history.push("/")}
                style={{ cursor: "pointer" }}
            >
                <img
                    className="ui mini image"
                    src={
                        process.env.PUBLIC_URL +
                        "/" +
                        process.env.REACT_APP_LOGO
                    }
                />
            </div>
            <div className="item font-20">Yatra 2.0</div>
            <div className="right item">
                {loggedIn && <div className="item">My Boards</div>}
                {loggedIn && (
                    <div
                        className="item"
                        onClick={() => props.setGlobal("_creatingBoard", true)}
                    >
                        Create New Board
                    </div>
                )}
                <ActionMenu {...props} />
            </div>
        </div>
    );
}
