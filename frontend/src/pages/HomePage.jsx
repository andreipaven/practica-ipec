import React, { useState } from "react";
import CustomBox from "../components/Containers/CustomBox.jsx";
import { Typography } from "@mui/material";
import useResponsive from "../components/Hooks/useResponsive.jsx";
import MainChart from "../components/Charts/MainChart.jsx";
import Header from "../components/Header/Header.jsx";
import themeColors from "../Themes/themeColors.jsx";

function HomePage() {
  const { isSmallScreen } = useResponsive();

  const [period, setPeriod] = useState("");
  const [equipment, setEquipment] = useState("");

  return (
    <CustomBox backgroundColor={themeColors.palette.primary.main}>
      <CustomBox>
        <Header equipmentX={setEquipment} periodX={setPeriod} />
        <CustomBox
          maxWidth={"100em"}
          padding={isSmallScreen ? "1em" : "3em"}
          backgroundColor={themeColors.palette.primary.light}
        >
          <Typography
            fontSize={"2em"}
            fontWeight={"bold"}
            alignItems={"start"}
            width={"100%"}
          >
            Energy Consumption Trends
          </Typography>
          <CustomBox>
            <MainChart period={period} equipment={equipment} />
          </CustomBox>
        </CustomBox>
      </CustomBox>
    </CustomBox>
  );
}

export default HomePage;
