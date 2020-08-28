import React from "react";

export function Loader(props) {
    return (
        <div className={"ui padded segment " + (props.basic ? "basic" : "")}>
            <div className="ui active inverted dimmer">
                <div className="ui active medium text loader">
                    {this.props.msg || ""}
                </div>
            </div>
            <img
                className="ui wireframe image"
                src="https://semantic-ui.com/images/wireframe/paragraph.png"
            />
        </div>
    );
}
