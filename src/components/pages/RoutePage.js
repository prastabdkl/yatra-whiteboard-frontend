import React from "react";

export const RoutePage = (props) => {
    return (
        <div className="ui container">
            <div class="ui fluid placeholder segment">
                <div class="ui icon header">
                    <i class="setting icon"></i>
                    This is a test component.
                </div>
                <div
                    class="ui primary button"
                    onClick={() => {
                        props.history.push("/");
                    }}
                >
                    Go to Home Page
                </div>
            </div>
        </div>
    );
};
