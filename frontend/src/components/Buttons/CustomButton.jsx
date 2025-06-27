import React from "react";
import { Button } from "@mui/material";

function CustomButton({
  alignItems,
  backgroundColor,
  backgroundColorHover,
  border,
  borderHover,
  borderRadius,
  boxShadow,
  color,
  colorHover,
  cursor,
  display,
  flex,
  fontSize,
  fontWeight,
  gap,
  height,
  icon,
  justifyContent,
  minWidth,
  onClick,
  outline,
  padding,
  size,
  value,
  variant,
  width,
  flexDirection,
  maxWidth,
  className,
  borderBottomHover,
  borderBottom,
  sx,
}) {
  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      onClick={onClick}
      sx={[
        {
          sx,
          backgroundColor: backgroundColor,
          color: color,
          width: width,
          height: height,
          fontWeight: fontWeight,
          borderRadius: borderRadius,
          border: border ? border : "1px solid #141450",
          boxShadow: boxShadow,
          fontSize: fontSize,
          padding: padding,
          display: display,
          justifyContent: justifyContent,
          gap: gap,
          alignItems: alignItems,
          cursor: cursor,
          minWidth: minWidth,
          flex: flex,
          flexDirection: flexDirection || "column",
          maxWidth: maxWidth,
          textTransform: "none",
          borderBottom: borderBottom,

          "&:focus": {
            outline: outline || "none",
          },
          "&:hover": {
            backgroundColor: backgroundColorHover,
            boxShadow: boxShadow,
            border: borderHover,
            color: colorHover,
            borderBottom: borderBottomHover,
          },
        },
        sx,
      ]}
    >
      {value} {icon}
    </Button>
  );
}

export default CustomButton;
