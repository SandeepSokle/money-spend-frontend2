import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./SelectInput.css";
import { useSelector } from "react-redux";
const SelectInput = (props) => {
  const { expenceCategories, setExpenceCategories, disabled } = props;
  const [options, setOptions] = useState([]);

  const userData = useSelector((state) => {
    return state.user.expenceCategories;
  });

  useEffect(() => {
    setOptions(
      userData.map((e) => {
        return {
          value: e,
          label: e,
        };
      })
    );
  }, [userData]);

  const [customInput, setCustomInput] = useState("");

  const handleInputChange = (newValue) => {
    setCustomInput(newValue);
  };

  const handleCreateOption = (inputValue) => {
    if (inputValue && !options.some((option) => option.value === inputValue)) {
      const newOption = { value: inputValue, label: inputValue };
      setOptions([...options, newOption]);
      setExpenceCategories(newOption);
    }
  };

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <label>Select an option or enter a new one:</label>
      <Select
        isDisabled={disabled}
        value={expenceCategories}
        options={options}
        onChange={(selected) => setExpenceCategories(selected)}
        onInputChange={handleInputChange}
        isSearchable
        placeholder="Select an option"
        createOptionPosition="first"
        onCreateOption={handleCreateOption}
        inputValue={customInput}
        onMenuClose={() => {
          handleCreateOption(customInput);
          setCustomInput("");
        }} // Clear input when the menu closes
      />
    </div>
  );
};

export default SelectInput;
