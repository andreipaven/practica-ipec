import React from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

function CustomSelect({
  value,
  onChange,
  options,
  maxWidth,
  label = "Select",
  id = "custom-select",
  ...rest
}) {
  return (
    <FormControl fullWidth sx={{ maxWidth: maxWidth, minWidth: maxWidth }}>
      {/* Label legat corect cu labelId */}
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
        fullWidth
        variant="outlined"
        displayEmpty
        {...rest}
      >
        {/* Placeholder vizual */}
        {value === "" && (
          <MenuItem value="" disabled>
            {label}
          </MenuItem>
        )}

        {/* Opțiuni dinamice */}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomSelect;
