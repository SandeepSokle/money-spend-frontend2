import * as React from "react";

import "./customDatePicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

export default function CustomDatePicker(props) {
  const { dateFilter, setDateFilter } = props;
  return (
    <DatePicker
      placeholderText="Select Date..."
      selected={dateFilter}
      onChange={(date) => setDateFilter(date)}
    />
  );
}

// class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl Mui-readOnly MuiInputBase-readOnly css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root"
// height: 39px;
