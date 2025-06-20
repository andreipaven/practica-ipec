import React from "react";
import CustomBox from "../components/Containers/CustomBox.jsx";
import { Typography } from "@mui/material";
import useResponsive from "../components/Hooks/useResponsive.jsx";
import MainChart from "../components/Charts/MainChart.jsx";
import Header from "../components/Header/Header.jsx";
import themeColors from "../Themes/themeColors.jsx";

function HomePage() {
  const { isSmallScreen } = useResponsive();
  return (
    <CustomBox backgroundColor={themeColors.palette.primary.main}>
      <Header />

      <CustomBox>
        <CustomBox maxWidth={"100em"} padding={isSmallScreen ? "1em" : "3em"}>
          <Typography fontSize={"1.5em"} fontWeight={"bold"}>
            Diagrama pe anul trecut
          </Typography>
          <CustomBox backgroundColor={themeColors.palette.primary.light}>
            <MainChart />
          </CustomBox>
        </CustomBox>
      </CustomBox>
    </CustomBox>
  );
}

export default HomePage;
