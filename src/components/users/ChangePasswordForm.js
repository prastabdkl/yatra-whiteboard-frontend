import React, { useState } from "react";
import { Formik } from "formik";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { changePassword } from "../../request";
import { FormError } from "../commons";
import { clearLocalStorage } from "../../misc";

const initialValues = {
    password: "",
    password_confirmation: "",
};

const schema = Yup.object().shape({
    old_password: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords don't match!")
        .required("Required"),
});

const ChangePasswordForm = (props) => {
    const { user, history, onCancel } = props;
    const [errors, setError] = useState([]);

    return (
        <div>
            <h2 className="ui header">Change Password</h2>
            <FormError errors={errors} />
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    setError([]);
                    console.log(values);
                    changePassword(user.idx, values).then((response) => {
                        if (!response.success) {
                            setError(response.data);
                            return toast(response.data.detail, {
                                type: "error",
                            });
                        }
                        toast("Password changed successfully", {
                            type: "success",
                        });
                        clearLocalStorage();
                        history.push("/login");
                    });
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
                }) => (
                    <Form
                        className=""
                        autocomplete="off"
                        onSubmit={handleSubmit}
                    >
                        <Form.Field>
                            <label htmlFor="">Old Password</label>
                            <Form.Input
                                fluid
                                placeholder="Old Password"
                                name="old_password"
                                type="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.old_password}
                                error={
                                    touched.old_password &&
                                    errors.old_password && {
                                        content: errors.old_password,
                                        pointing: "above",
                                    }
                                }
                            />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="">New Password</label>
                            <Form.Input
                                fluid
                                placeholder="New Password"
                                name="password"
                                type="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                error={
                                    touched.password &&
                                    errors.password && {
                                        content: errors.password,
                                        pointing: "above",
                                    }
                                }
                            />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="">Confirm New Password</label>
                            <Form.Input
                                fluid
                                placeholder="Password Confirmation"
                                name="password_confirmation"
                                type="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password_confirmation}
                                error={
                                    touched.password_confirmation &&
                                    errors.password_confirmation && {
                                        content: errors.password_confirmation,
                                        pointing: "above",
                                    }
                                }
                            />
                        </Form.Field>
                        <div className="ui grid right aligned right floated">
                            <div className="ui column">
                                <Button
                                    color="grey"
                                    size="large"
                                    onClick={onCancel}
                                    disabled={isSubmitting}
                                >
                                    {"Cancel"}
                                </Button>
                                <Button
                                    primary
                                    size="large"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {"Submit"}
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ChangePasswordForm;
