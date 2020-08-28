import React from "react";
import { NavLink, Link, withRouter, matchPath } from "react-router-dom";

const $ = window.$;

class SideNavContent extends React.Component {
    constructor(props) {
        super(props);
        this._id = "SideNavContent";
    }

    componentDidMount() {
        $(".ui.accordion").accordion();
    }

    isActiveUrl = (path, match, location) => {
        return;
        if (path && location.pathname.startsWith(path)) {
            return true;
        }
        if (!match) {
            return false;
        }
        return true;
    };
    render() {
        const { _user, routes, children } = this.props;

        return (
            <React.Fragment>
                <div className="ui items m-0">
                    <div class="ui item">
                        <div class="">
                            <i className="user circle teal icon huge" />
                        </div>
                        <div class="content">
                            <h4>{_user.name}</h4>
                            <div class="meta">
                                {_user.roles &&
                                    _user.roles.map((role) => (
                                        <div
                                            className={`${role.name} ui label mini`}
                                        >
                                            {role.name}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="meta">
                    <i className="ui icon mail outline" />
                    <small>{_user.email}</small>
                </div>

                <hr className="divider" />

                <div
                    className="ui secondary vertical menu accordion "
                    id="kNav"
                >
                    {routes.map((mainNav, index) => {
                        let isActive = this.props.location.pathname.startsWith(
                            mainNav.rootPath
                        );
                        let activeClass = isActive ? "active" : "";
                        if (!mainNav.title) return;
                        if (
                            typeof mainNav.accessible !== "undefined" &&
                            !mainNav.accessible
                        )
                            return;
                        if (mainNav.nav == false) return;
                        return (
                            <div key={index}>
                                {mainNav.title && (
                                    <NavLink
                                        exact
                                        to={mainNav.path}
                                        isActive={this.isActiveUrl.bind(
                                            this,
                                            mainNav.rootPath
                                        )}
                                        className="title item"
                                        style={{
                                            paddingLeft: mainNav.icon
                                                ? "auto"
                                                : "15px",
                                        }}
                                        activeStyle={{
                                            color: "#5d2e8e",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {mainNav.icon ? (
                                            <i
                                                className={`${mainNav.icon} icon`}
                                            />
                                        ) : null}
                                        <span className="mg-top-5">
                                            {mainNav.title}
                                        </span>
                                        {mainNav.rootPath &&
                                            !!mainNav.routes && (
                                                <i className="dropdown icon float-right"></i>
                                            )}
                                    </NavLink>
                                )}
                                {mainNav.routes && (
                                    <div
                                        style={{ paddingLeft: "20px" }}
                                        className={"content " + activeClass}
                                    >
                                        {mainNav.routes.map((nav, ndex) => {
                                            if (!nav.title) return null;
                                            let showNav =
                                                typeof nav.accessible ===
                                                    "undefined" ||
                                                nav.accessible;
                                            if (showNav) {
                                                return (
                                                    <div key={ndex}>
                                                        <NavLink
                                                            className="item"
                                                            to={nav.path}
                                                        >
                                                            {nav.icon && (
                                                                <i
                                                                    className={`${nav.icon} icon`}
                                                                />
                                                            )}
                                                            {nav.title}
                                                            {nav.count && (
                                                                <div className="ui teal label">
                                                                    {nav.count}
                                                                </div>
                                                            )}
                                                        </NavLink>
                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </React.Fragment>
        );
    }
}
export { SideNavContent };
