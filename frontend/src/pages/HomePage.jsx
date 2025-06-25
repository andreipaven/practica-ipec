import React, { useEffect, useState } from "react";
import CustomBox from "../components/Containers/CustomBox.jsx";
import { Box, Typography } from "@mui/material";
import useResponsive from "../components/Hooks/useResponsive.jsx";
import MainChart from "../components/Charts/MainChart.jsx";
import Header from "../components/Header/Header.jsx";
import themeColors from "../Themes/themeColors.jsx";
import Statistics from "../components/Statistics/Statistics.jsx";
import CustomDatePicker from "../components/Inputs/CustomDatePicker.jsx";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import CustomSelect from "../components/Buttons/CustomSelect.jsx";

function HomePage() {
  const { isMediumScreen, isLargeScreen } = useResponsive();

  const [period, setPeriod] = useState("2025-06-10");
  const [equipment, setEquipment] = useState("TD7");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [lastChanged, setLastChanged] = useState("");
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [equipmentOptions, setEquipmentOptions] = useState([]);
  const [customEquipments, setCustomEquipments] = useState([]);

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

  useEffect(() => {
    console.log(customEquipments);
  }, [customEquipments]);

  return (
    <CustomBox backgroundColor={themeColors.palette.primary.main}>
      <Header
        equipmentX={setEquipment}
        periodX={setPeriod}
        optionsEquipments={setEquipmentOptions}
      />

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

            <CustomBox
              flexDirection={isMediumScreen ? "column" : "row"}
              gap={"1em"}
              maxWidth={"auto"}
            >
              <CustomSelect
                multiple={true}
                options={equipmentOptions}
                maxWidth={"6em"}
                // size={"small"}
                label={"Equipments"}
                value={customEquipments}
                onChange={(e) => setCustomEquipments(e.target.value)}
              />
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
              customEquipments={customEquipments}
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
