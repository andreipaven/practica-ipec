import React, { useState } from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

function CustomSelect({
  value,
  onChange,
  options,
  maxWidth,
  minWidth,
  label,
  id = "custom-select",
  ...rest
}) {
  const [isFocused, setIsFocused] = useState(false);

  const shouldShrink = isFocused || value !== "";

  return (
    <FormControl sx={{ maxWidth: maxWidth, minWidth: minWidth }}>
      {/* Label legat corect cu labelId */}
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        value={value}
        label={shouldShrink ? label : undefined}
        onChange={onChange}
        fullWidth
        variant="outlined"
        displayEmpty
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      >
        {/* Placeholder vizual */}
        {value === undefined && (
          <MenuItem value="" disabled>
            {isFocused ? undefined : label}
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
