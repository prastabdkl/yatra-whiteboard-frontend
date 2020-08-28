import React, { Fragment } from "react";
import { Segment } from "semantic-ui-react";

export const withLoading = (Component) => (props) => (
    <Fragment>
        {props.loading && (
            <Segment>
                <Component {...props} />
            </Segment>
        )}
        {!props.loading && <Component {...props} />}
    </Fragment>
);
