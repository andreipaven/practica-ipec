import React from "react";
import { Typography } from "@mui/material";
import themeColors from "../../Themes/themeColors.jsx";
import CustomBox from "../Containers/CustomBox.jsx";
import useResponsive from "../Hooks/useResponsive.jsx";
import BoltIcon from "@mui/icons-material/Bolt";

const Statistics = ({ totalConsumption }) => {
  const { isMediumScreen } = useResponsive();
  const pricePerKwh = 0.25;

  const stats = [
    {
      title: "Total Consumption",
      icon: (
        <BoltIcon
          sx={{
            backgroundColor: themeColors.palette.secondary.main,
            color: themeColors.palette.secondary.contrastText,
            fontSize: "3em",
            boxShadow:
              "rgb(204, 219, 232) 3px 3px 6px 2px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",

            borderRadius: ".2em",
          }}
        />
      ),
      value: `${totalConsumption.toFixed(0)} kWh`,
      valueColor: themeColors.palette.secondary.dark,
    },
    {
      title: "Active Equipment",
      value: "128",
      valueColor: "#2b6cb0",
    },
    {
      title: "Estimated Cost",
      value: `€${(totalConsumption * pricePerKwh).toFixed(0)}`,
      valueColor: "#2b6cb0",
    },
    {
      title: "Alt Cost",
      value: "€88.00",
      valueColor: "#2b6cb0",
    },
  ];

  return (
    <CustomBox
      gridTemplateColumns={isMediumScreen ? "repeat(2,1fr)" : "repeat(4,1fr)"}
      display="grid"
      gap="1.5em"
      flexDirection="row"
      maxWidth="100em"
    >
      {stats.map((stat, index) => (
        <CustomBox
          key={index}
          backgroundColor={themeColors.palette.primary.light}
          padding="1.5em"
          borderRadius="1em"
          boxShadow="0 4px 10px rgba(3,0,0,0.4)"
        >
          <Typography textAlign="start" width={"100%"}>
            {stat.icon}
          </Typography>
          <Typography
            fontSize="1.1em"
            fontWeight="500"
            color="#444"
            textAlign="center"
          >
            {stat.title}
          </Typography>
          <Typography
            fontSize="1.8em"
            fontWeight="bold"
            color={stat.valueColor}
            textAlign="center"
          >
            {stat.value}
          </Typography>
        </CustomBox>
      ))}
    </CustomBox>
  );
};

export default Statistics;
