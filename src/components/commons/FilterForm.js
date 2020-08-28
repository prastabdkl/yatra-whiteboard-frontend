import React, { Fragment, useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import { Picker } from "./Datepicker";

const $ = window.$;

export function FilterForm(props) {
    const { fields = [], onSubmit, setParams } = props;
    const chunks = fields.chunk(2);

    const [values, setValues] = useState({});
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        var form = $("#FilterForm").form();
        form.form({
            onSuccess: (e) => {
                setFetching(true);

                e.preventDefault();
                var data = form.form("get values");
                onSubmit(data).then((v) => {
                    setFetching(false);
                });
            },
        });
    }, []);

    useEffect(() => {
        var initialValues = {};
        fields.map((field) => {
            initialValues[field.name] = field.value;
        });
        setValues(initialValues);
    }, []);

    const setFieldValue = (field, value) => {
        var finalValues = Object.assign({}, values);
        finalValues[field] = value;
        setValues(finalValues);
    };

    return (
        <Form id="FilterForm">
            <h4>Filter</h4>
            {chunks.map((fields) => (
                <Form.Group>
                    {fields.map((field) => (
                        <Fragment>
                            {field.type == "date" && (
                                <Fragment>
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        type="hidden"
                                        value={values[field.name]}
                                    />
                                    <Form.Input
                                        fluid
                                        label={field.label}
                                        placeholder={field.label}
                                        name={field.name}
                                        control={Picker}
                                        onChange={(date) => {
                                            // $(`input#${field.name}`).val(date);
                                            setFieldValue(field.name, date);
                                        }}
                                        width={8}
                                    />
                                </Fragment>
                            )}
                            {field.type == "text" && (
                                <Form.Input
                                    fluid
                                    label={field.label}
                                    placeholder={field.label}
                                    name={field.name}
                                    width={8}
                                    onChange={(event, data) => {
                                        setFieldValue(field.name, data.value);
                                    }}
                                />
                            )}
                            {field.type == "select" && (
                                <Fragment>
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        type="hidden"
                                        value={values[field.name]}
                                    />
                                    <Form.Select
                                        fluid
                                        label={field.label}
                                        placeholder={field.label}
                                        selection
                                        name={field.name}
                                        options={field.options.map((option) => {
                                            return {
                                                key: option.key,
                                                value: option.value,
                                                text: option.text,
                                            };
                                        })}
                                        onChange={(e, data) => {
                                            // $(`input#${field.name}`).val(data.value);
                                            setFieldValue(
                                                field.name,
                                                data.value
                                            );
                                        }}
                                        defaultValue={field.value}
                                        width={8}
                                    />
                                </Fragment>
                            )}
                        </Fragment>
                    ))}
                </Form.Group>
            ))}

            <Form.Button primary loading={fetching}>
                Filter
            </Form.Button>
        </Form>
    );
}
