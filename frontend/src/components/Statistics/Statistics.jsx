// components/Statistics.jsx
import React from "react";

import { Typography } from "@mui/material";
import themeColors from "../../Themes/themeColors.jsx";
import CustomBox from "../Containers/CustomBox.jsx";

const Statistics = ({ totalConsumption }) => {
  return (
    <CustomBox
      display="grid"
      gridTemplateColumns={"repeat(4,1fr)"}
      gap="1.5em"
      flexDirection={"row"}
      maxWidth={"100em"}
    >
      <CustomBox
        backgroundColor={themeColors.palette.primary.light}
        padding="1.5em"
        borderRadius="1em"
        boxShadow="0 4px 10px rgba(0,0,0,0.1)"
      >
        <Typography>Total Consumption</Typography>
        <Typography
          fontWeight="bold"
          color={themeColors.palette.secondary.dark}
        >
          {totalConsumption.toFixed(0)} kWh
        </Typography>
      </CustomBox>

      <CustomBox
        backgroundColor={themeColors.palette.primary.light}
        padding="1.5em"
        borderRadius="1em"
        boxShadow="0 4px 10px rgba(0,0,0,0.1)"
      >
        <Typography fontSize="1.1em" fontWeight="500" color="#444">
          Echipamente Active
        </Typography>
        <Typography fontSize="1.8em" fontWeight="bold" color="#2b6cb0">
          14
        </Typography>
      </CustomBox>

      <CustomBox
        backgroundColor={themeColors.palette.primary.light}
        padding="1.5em"
        borderRadius="1em"
        boxShadow="0 4px 10px rgba(0,0,0,0.1)"
      >
        <Typography fontSize="1.1em" fontWeight="500" color="#444">
          Cost Estimat
        </Typography>
        <Typography fontSize="1.8em" fontWeight="bold" color="#2b6cb0">
          €123.45
        </Typography>
      </CustomBox>
      <CustomBox
        backgroundColor={themeColors.palette.primary.light}
        padding="1.5em"
        borderRadius="1em"
        boxShadow="0 4px 10px rgba(0,0,0,0.1)"
      >
        <Typography fontSize="1.1em" fontWeight="500" color="#444">
          Cost Estimat
        </Typography>
        <Typography fontSize="1.8em" fontWeight="bold" color="#2b6cb0">
          €123.45
        </Typography>
      </CustomBox>
    </CustomBox>
  );
};

export default Statistics;
