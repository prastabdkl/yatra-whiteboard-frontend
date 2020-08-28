import React, { useState, useEffect } from "react";
import { Form, Modal, Button } from "semantic-ui-react";
import { createBoard } from "../../request";
import { toast } from "react-toastify";
import { FormError } from "../commons";

const $ = window.$;

export const BoardForm = (props) => {
    const [fetching, setFetching] = useState(false);
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        var form = $("#BoardForm").form();
        form.form({
            fields: {
                name: "empty",
            },
            onSuccess: (e) => {
                e.preventDefault();

                var data = form.form("get values");
                setFetching(true);
                data.user = props._user.idx;
                debugger;
                createBoard(data).then((response) => {
                    setFetching(false);
                    if (!response.success) {
                        toast(response.data.detail, { type: "error" });
                        setErrors(response.data);
                        return;
                    }
                    props.history.push("/boards");
                });
            },
        });
    }, []);

    return (
        <div>
            <Form id="BoardForm">
                <FormError errors={errors} />
                <Form.Group inline>
                    <Form.Field>
                        <Form.Input
                            id="name"
                            name="name"
                            type="text"
                        ></Form.Input>
                    </Form.Field>
                    <Button
                        type="submit"
                        className="ui basic primary button"
                        loading={fetching}
                        disabled={fetching}
                    >
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
};
