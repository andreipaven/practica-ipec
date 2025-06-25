import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function CustomDatePicker({ backgroundColor, width, color, label }) {
  const [value, setValue] = useState(null);

  return (
    <DatePicker
      label={label}
      value={value}
      onChange={(newValue) => setValue(newValue)}
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
