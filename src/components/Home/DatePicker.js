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