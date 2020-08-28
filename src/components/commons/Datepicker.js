import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import moment from "moment";

const Picker = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker
            showPopperArrow={false}
            selected={startDate}
            dateFormat="yyyy-MM-dd"
            onChange={(date) => {
                props.onChange(moment(date).format("YYYY-MM-DD"));
                setStartDate(date);
            }}
        />
    );
};

export { Picker };
