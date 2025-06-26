import React, { useEffect, useState } from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import useResponsive from "../Hooks/useResponsive.jsx";

function CustomSelect({
  value,
  onChange,
  options,
  maxWidth,
  minWidth,
  label,
  fontSize,
  multiple,
  id = "custom-select",
  ...rest
}) {
  const { isMediumScreen } = useResponsive();
  const [isFocused, setIsFocused] = useState(false);

  const isEmptyValue = multiple
    ? Array.isArray(value) && value.length === 0
    : value === "";
  const shouldShrink = isFocused || !isEmptyValue;

  return (
    <FormControl
      sx={{
        maxWidth: maxWidth,
        minWidth: minWidth || "8em",
      }}
      fullWidth={true}
      size={isMediumScreen ? "small" : "medium"}
    >
      {/* Label legat corect cu labelId */}
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        multiple={multiple || false}
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
        {value === undefined && (
          <MenuItem value="" disabled>
            {isFocused ? undefined : label}
          </MenuItem>
        )}

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
