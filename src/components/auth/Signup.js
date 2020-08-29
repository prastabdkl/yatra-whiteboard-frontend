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

import { loginUser, signUpUser } from "../../request";

import { FormError } from "../commons";

const $ = window.$;

const Signup = (props) => {
    const [fetching, setFetching] = useState(false);
    const [message, setMessage] = useState("");
    const [errors, setError] = useState("");

    useEffect(() => {
        var form = $("#SignupForm").form();
        form.form({
            fields: {
                username: "empty",
                email: "email",
                password1: "empty",
                password2: "empty",
            },
            onSuccess: (e) => {
                e.preventDefault();

                var data = form.form("get values");
                setFetching(true);
                data.user_type = 1;
                data.is_premium = false;
                signUpUser(data).then((response) => {
                    debugger;
                    setFetching(false);
                    if (!response.success) {
                        toast(response.data.detail, { type: "error" });
                        setError(response.data);
                        return;
                    }
                    toast(response.data.detail, { type: "success" });
                    props.history.push("/login");
                });
            },
        });
    }, []);

    return (
        <div className="ui container">
            <div className="ui centered grid">
                <div className="six wide computer sixteen wide mobile column">
                    <Segment padded loading={fetching}>
                        <h2 className="ui medium header text-center">Signup</h2>
                        {Object.keys(errors).length > 0 && (
                            <FormError errors={errors} />
                        )}

                        <form className="ui form" id="SignupForm">
                            <div className="field">
                                <label>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Enter username"
                                />
                            </div>
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
                                    name="password1"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div className="field">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    name="password2"
                                    placeholder="Re-Enter your password"
                                />
                            </div>
                            <div className="ui error message" />
                            <button
                                className="ui primary button fluid"
                                type="submit"
                            >
                                Sign Up
                            </button>
                            {/* <div className="ui message text-center">
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setMessage("Please contact your Administrator.");
                  }}
                  className="pointer"
                >
                  {message}
                </a>
              </div> */}
                        </form>
                    </Segment>
                </div>
            </div>
        </div>
    );
};

export { Signup };
