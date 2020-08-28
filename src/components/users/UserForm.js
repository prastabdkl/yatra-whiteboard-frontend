import React, { useState, useEffect } from "react";
import {
    Form,
    Button,
    Input,
    Segment,
    Header,
    Dropdown,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Alert } from "../commons";
import { Formik } from "formik";
import * as Yup from "yup";
import {
    getAllRoles,
    getAllBranches,
    createUser,
    getUserDetails,
} from "../../request";
import { toast } from "react-toastify";
import { FormError } from "../commons";
import { branch } from "recompose";

const UserForm = (props) => {
    const [branches, setBranches] = useState([]);
    const [user, setUser] = useState({});
    const [roles, setRoles] = useState([]);
    const [errors, setError] = useState("");

    const { idx } = props.match.params;
    debugger;

    const UserSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
        password: user.idx ? Yup.string() : Yup.string().required("Required"),
        branch: Yup.string().required("Required"),
        roles: Yup.string().required("Required"),
    });

    useEffect(() => {
        debugger;
        getAllRoles().then((response) => {
            if (!response.success) return;
            setRoles(response.data.records);
        });

        getAllBranches().then((response) => {
            if (!response.success) return;
            setBranches(response.data.records);
        });

        if (idx) {
            getUserDetails(idx).then((response) => {
                debugger;
                if (!response.success) return;
                console.log("USER", response.data);
                setUser(response.data);
            });
        }
    }, []);

    return (
        <div class="ui two column centered relaxed grid">
            <div className="column">
                <Segment>
                    <div className="">
                        <div class="">
                            <h2 className="page-title">
                                {user.idx ? "Edit User" : "Add New User"}
                            </h2>
                            <FormError errors={errors} />
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    ...user,
                                    roles: user.roles
                                        ? user.roles.map((r) => {
                                              var role = roles.find(
                                                  (v) => v.name == r
                                              );
                                              if (role == undefined) {
                                                  return null;
                                              }
                                              return role.idx;
                                          })
                                        : [],
                                    branch:
                                        user.branch && branches.length
                                            ? branches.find(
                                                  (v) => v.name == user.branch
                                              ).idx
                                            : "",
                                }}
                                validationSchema={UserSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    setSubmitting(true);
                                    createUser(user.idx, values).then(
                                        (response) => {
                                            setSubmitting(false);
                                            if (!response.success) {
                                                setError(response.data);
                                                return toast(
                                                    response.data.detail,
                                                    { type: "error" }
                                                );
                                            }
                                            toast(
                                                user.idx
                                                    ? "User has been updated successfully"
                                                    : "User has been created Successfully",
                                                { type: "success" }
                                            );
                                            props.history.push(
                                                `/user/${response.data.idx}`
                                            );
                                        }
                                    );
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                    setFieldValue,
                                    /* and other goodies */
                                }) => (
                                    <Form
                                        className=""
                                        autocomplete="off"
                                        onSubmit={handleSubmit}
                                    >
                                        <Form.Field>
                                            <label htmlFor="">Name</label>
                                            <Form.Input
                                                fluid
                                                placeholder="Full Name"
                                                value={user.name}
                                                name="name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                                error={
                                                    touched.name &&
                                                    errors.name && {
                                                        content: errors.name,
                                                        pointing: "above",
                                                    }
                                                }
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label htmlFor="">Email</label>
                                            <Form.Input
                                                fluid
                                                placeholder="Email"
                                                value={user.email}
                                                name="email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                                error={
                                                    touched.email &&
                                                    errors.email && {
                                                        content: errors.email,
                                                        pointing: "above",
                                                    }
                                                }
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label htmlFor="">Password</label>
                                            {user.idx && (
                                                <small>
                                                    Leave blank if you don't
                                                    want to change the password.
                                                </small>
                                            )}
                                            <Form.Input
                                                fluid
                                                placeholder="Password"
                                                value={user.password}
                                                name="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                type="password"
                                                error={
                                                    touched.password &&
                                                    errors.password && {
                                                        content:
                                                            errors.password,
                                                        pointing: "above",
                                                    }
                                                }
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label htmlFor="">Branch</label>
                                            <Dropdown
                                                fluid
                                                clearable
                                                options={branches.map(
                                                    (branch) => ({
                                                        key: branch.idx,
                                                        value: branch.idx,
                                                        text: branch.name,
                                                    })
                                                )}
                                                selection
                                                placeholder="Select One"
                                                name="branch"
                                                onChange={(e, data) => {
                                                    setFieldValue(
                                                        "branch",
                                                        data.value
                                                    );
                                                }}
                                                onBlur={handleBlur}
                                                value={values.branch}
                                                error={
                                                    touched.branch &&
                                                    errors.branch && {
                                                        content: errors.branch,
                                                        pointing: "above",
                                                    }
                                                }
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label htmlFor="">Role</label>
                                            <Form.Dropdown
                                                fluid
                                                clearable
                                                options={roles.map((role) => ({
                                                    key: role.idx,
                                                    value: role.idx,
                                                    text: role.name,
                                                }))}
                                                multiple
                                                search
                                                selection
                                                placeholder="Role"
                                                name="roles"
                                                onChange={(e, data) => {
                                                    setFieldValue(
                                                        "roles",
                                                        data.value
                                                    );
                                                }}
                                                onBlur={handleBlur}
                                                value={values.roles}
                                                error={
                                                    touched.roles &&
                                                    errors.roles && {
                                                        content: errors.roles,
                                                        pointing: "above",
                                                    }
                                                }
                                            />
                                        </Form.Field>
                                        <Button
                                            primary
                                            fluid
                                            size="large"
                                            type="submit"
                                            disabled={isSubmitting}
                                            loading={isSubmitting}
                                        >
                                            {user.idx ? "Update" : "Submit"}
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </Segment>
            </div>
        </div>
    );
};

UserForm.propTypes = {};

export { UserForm };
