import React, { useEffect, useState } from "react";
import CustomBox from "../components/Containers/CustomBox.jsx";
import { Typography } from "@mui/material";
import useResponsive from "../components/Hooks/useResponsive.jsx";
import MainChart from "../components/Charts/MainChart.jsx";
import Header from "../components/Header/Header.jsx";
import themeColors from "../Themes/themeColors.jsx";
import Statistics from "../components/Statistics/Statistics.jsx";

import CustomDatePicker from "../components/Inputs/CustomDatePicker.jsx";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

function HomePage() {
  const { isMediumScreen, isLargeScreen } = useResponsive();

  const [period, setPeriod] = useState("");
  const [equipment, setEquipment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [lastChanged, setLastChanged] = useState("");
  const [totalConsumption, setTotalConsumption] = useState("");

  const handleStartDate = (e) => {
    const formatted = e?.format("YYYY-MM-DD");
    setStartDate(formatted);
    setLastChanged("custom");
  };
  const handleEndDate = (e) => {
    const formatted = e?.format("YYYY-MM-DD");
    setEndDate(formatted);
    setLastChanged("custom");
  };

  useEffect(() => {
    setLastChanged("default");
  }, [period, equipment]);

  return (
    <CustomBox backgroundColor={themeColors.palette.primary.main}>
      <Header equipmentX={setEquipment} periodX={setPeriod} />

      <CustomBox padding={isMediumScreen ? "1em" : "1em 3em"} gap={"1em"}>
        <Statistics totalConsumption={totalConsumption} />

        <CustomBox
          maxWidth={"100em"}
          backgroundColor={themeColors.palette.primary.light}
          padding={"1em"}
          borderRadius={"1em"}
        >
          <CustomBox flexDirection={"row"} justifyContent={"space-between"}>
            {isLargeScreen ? (
              <ElectricBoltIcon
                sx={{
                  backgroundColor: themeColors.palette.secondary.main,
                  color: themeColors.palette.primary.light,
                  fontSize: "3em",
                  boxShadow: 8,
                  borderRadius: "16px",
                }}
              />
            ) : (
              <Typography
                fontSize={"2em"}
                fontWeight={"bold"}
                alignItems={"start"}
                width={"100%"}
              >
                Energy Consumption Trends
              </Typography>
            )}

            <CustomBox flexDirection={"row"} gap={"1em"} maxWidth={"20em"}>
              <CustomDatePicker
                label={"Start date"}
                onChange={handleStartDate}
              />
              <CustomDatePicker label={"End date"} onChange={handleEndDate} />
            </CustomBox>
          </CustomBox>
          <CustomBox>
            <MainChart
              period={period}
              equipment={equipment}
              startDate={startDate}
              endDate={endDate}
              lastChanged={lastChanged}
              setTotalConsumption={setTotalConsumption}
            />
          </CustomBox>
        </CustomBox>
      </CustomBox>
    </CustomBox>
  );
}

export default HomePage;
