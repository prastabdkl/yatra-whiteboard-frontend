import React, { useState, useEffect } from "react";
import {
    Header,
    Segment,
    Container,
    Button,
    Form,
    Message,
} from "semantic-ui-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { loginUser } from "../../request";

import { FormError } from "../commons";

const $ = window.$;

const Login = (props) => {
    const [fetching, setFetching] = useState(false);
    const [message, setMessage] = useState("Don't have an account?");
    const [errors, setError] = useState("");

    useEffect(() => {
        var form = $("#LoginForm").form();
        form.form({
            fields: {
                email: "email",
                password: "empty",
            },
            onSuccess: (e) => {
                e.preventDefault();

                var data = form.form("get values");
                setFetching(true);

                loginUser(data).then((response) => {
                    debugger;
                    setFetching(false);
                    if (!response.success) {
                        toast(response.data.detail, { type: "error" });
                        setError(response.data);
                        return;
                    }
                    props.setGlobal("_user", response.data.user);
                    window.localStorage.setItem(
                        "_user-details",
                        JSON.stringify({
                            ...response.data.user,
                            key: response.data.key,
                        })
                    );
                    props.history.push("/home");
                    props.setGlobal("_token", response.data.key);
                    window.location.reload();
                });
            },
        });
    }, []);

    return (
        <div className="ui container" id="login-container">
            <div className="ui centered grid">
                <div className="fourteen wide computer sixteen wide mobile column">
                    <Segment padded loading={fetching}>
                        <h2 className="ui medium header text-center">Login</h2>
                        {Object.keys(errors).length > 0 && (
                            <FormError errors={errors} />
                        )}

                        <form className="ui form" id="LoginForm">
                            <div className="field">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div className="ui error message" />
                            <button
                                className="ui primary button fluid"
                                type="submit"
                            >
                                Submit
                            </button>
                            <div className="ui message text-center">
                                <a
                                    href="#"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setMessage(
                                            "Please contact your Administrator."
                                        );
                                    }}
                                    className="pointer"
                                >
                                    {message}
                                </a>
                            </div>
                        </form>
                    </Segment>
                </div>
            </div>
        </div>
    );
};

export { Login };
