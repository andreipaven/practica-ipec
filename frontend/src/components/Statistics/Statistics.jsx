import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import themeColors from "../../Themes/themeColors.jsx";
import CustomBox from "../Containers/CustomBox.jsx";
import useResponsive from "../Hooks/useResponsive.jsx";
import BoltIcon from "@mui/icons-material/Bolt";
import ConstructionIcon from "@mui/icons-material/Construction";
import EuroIcon from "@mui/icons-material/Euro";
import SavingsIcon from "@mui/icons-material/Savings";
import { fetchGetAnnualCost } from "../../Services/reportService.js";

const Statistics = ({ totalConsumption }) => {
  const { isMediumScreen } = useResponsive();
  const pricePerKwh = 0.22;
  const [anualCost, setAnualCost] = useState(null);

  useEffect(() => {
    fetchGetAnnualCost().then((res) => {
      if (res.success) {
        setAnualCost(`${parseFloat(res.result).toFixed(2)}`);
      } else {
        console.warn("Failed to fetch annual cost:", res.message);
      }
    });
  }, []);

  const stats = [
    {
      title: "Active Equipments",
      icon: (
        <ConstructionIcon
          sx={{
            backgroundColor: themeColors.palette.success.light,
            color: "rgb(234 88 12 / var(--tw-bg-opacity, 1))",
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
            backgroundColor: themeColors.palette.success.light,
            color: themeColors.palette.secondary.main,
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
            backgroundColor: themeColors.palette.success.light,
            color: "#00ff22",
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
      title: "Anual Cost",
      icon: (
        <SavingsIcon
          sx={{
            backgroundColor: themeColors.palette.success.light,
            color: "#ff00ea",
            fontSize: "3em",
            borderRadius: ".2em",
            boxShadow: 4,
          }}
        />
      ),
      value:
        anualCost !== null
          ? `€${(anualCost * 0.88 * 0.22).toFixed(2)}`
          : "Loading...",

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
