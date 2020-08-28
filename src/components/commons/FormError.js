import React from "react";
import PropTypes from "prop-types";

export function FormError({ errors }) {
    if (Object.keys(errors).length < 1) {
        return null;
    }
    if (typeof errors === "string") {
        return <div className="ui error message">{errors}</div>;
    }
    return (
        <div className="ui error message">
            <ul>
                {Object.keys(errors).map((key) => (
                    <li>{errors[key]}</li>
                ))}
            </ul>
        </div>
    );
}

// FormError.propTypes = {
// 	errors: PropTypes.array
// };
