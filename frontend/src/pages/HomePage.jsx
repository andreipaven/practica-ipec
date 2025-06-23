import React, { useState } from "react";
import CustomBox from "../components/Containers/CustomBox.jsx";
import { Typography } from "@mui/material";
import useResponsive from "../components/Hooks/useResponsive.jsx";
import MainChart from "../components/Charts/MainChart.jsx";
import Header from "../components/Header/Header.jsx";

function HomePage() {
  const { isSmallScreen } = useResponsive();

  const [period, setPeriod] = useState("");
  const [equipment, setEquipment] = useState("");

  return (
    <CustomBox>
      <CustomBox>
        <Header equipmentX={setEquipment} periodX={setPeriod} />
        <CustomBox maxWidth={"100em"} padding={isSmallScreen ? "1em" : "3em"}>
          <Typography fontSize={"1.5em"} fontWeight={"bold"}>
            Diagrama
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
