import React from "react";
import { Typography } from "@mui/material";
import themeColors from "../../Themes/themeColors.jsx";
import CustomBox from "../Containers/CustomBox.jsx";
import useResponsive from "../Hooks/useResponsive.jsx";
import BoltIcon from "@mui/icons-material/Bolt";
import ConstructionIcon from "@mui/icons-material/Construction";
import EuroIcon from "@mui/icons-material/Euro";

const Statistics = ({ totalConsumption }) => {
  const { isMediumScreen } = useResponsive();
  const pricePerKwh = 0.22;

  const stats = [
    {
      title: "Active Equipment",
      icon: (
        <ConstructionIcon
          sx={{
            backgroundColor: "rgb(234 88 12 / var(--tw-bg-opacity, 1))",
            color: themeColors.palette.primary.light,
            fontSize: "3em",
            borderRadius: ".2em",
            boxShadow: 4,
          }}
        />
      ),
      value: "128",
      valueColor: "#2b6cb0",
    },

    {
      title: "Total Consumption",
      icon: (
        <BoltIcon
          sx={{
            backgroundColor: themeColors.palette.secondary.main,
            color: themeColors.palette.primary.light,
            fontSize: "3em",
            borderRadius: ".2em",
            boxShadow: 4,
          }}
        />
      ),
      value: `${totalConsumption.toFixed(0)} kWh`,
      valueColor: themeColors.palette.secondary.dark,
    },

    {
      title: "Estimated Cost",
      icon: (
        <EuroIcon
          sx={{
            backgroundColor: themeColors.palette.success.dark,
            color: themeColors.palette.primary.light,
            fontSize: "3em",
            borderRadius: ".2em",
            boxShadow: 4,
          }}
        />
      ),
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
          alignItems="start"
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
