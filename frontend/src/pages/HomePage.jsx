import React, { useState } from "react";
import CustomBox from "../components/Containers/CustomBox.jsx";
import { Typography } from "@mui/material";
import useResponsive from "../components/Hooks/useResponsive.jsx";
import MainChart from "../components/Charts/MainChart.jsx";
import Header from "../components/Header/Header.jsx";
import themeColors from "../Themes/themeColors.jsx";
import Statistics from "../components/Statistics/Statistics.jsx";

function HomePage() {
  const { isMediumScreen } = useResponsive();

  const [period, setPeriod] = useState("");
  const [equipment, setEquipment] = useState("");

  return (
    <CustomBox backgroundColor={themeColors.palette.primary.main}>
      <Header equipmentX={setEquipment} periodX={setPeriod} />

      <CustomBox padding={isMediumScreen ? "1em" : "1em 3em"}>
        <Statistics />

        <CustomBox
          maxWidth={"100em"}
          backgroundColor={themeColors.palette.primary.light}
          padding={"1em"}
          borderRadius={"1em"}
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
