import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function CustomDatePicker({
  backgroundColor,
  width,
  color,
  label,
  value,
  onChange,
}) {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      slotProps={{
        textField: {
          variant: "standard",
          sx: {
            width: width,
            backgroundColor: backgroundColor,
            "& .MuiInputBase-root": {
              color: color,
            },
            "& .MuiSvgIcon-root": {
              color: color,
            },
          },
        },
      }}
    />
  );
}

export default CustomDatePicker;
