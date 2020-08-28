import React, { Fragment, useEffect } from "react";
import { Segment } from "semantic-ui-react";

export const withEmptyValue = (Component) => (props) => (
    <Fragment>
        {/* {props.values.length > 0 ? (
			<Segment fluid placeholder className='text-center'>
				<h3 className='header'> No items to display</h3>
			</Segment>
		) : (
			<Component {...props} />
		)} */}
        <Component {...props} />
    </Fragment>
);
