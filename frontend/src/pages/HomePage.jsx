import React, { useEffect, useState } from "react";
import CustomBox from "../components/Containers/CustomBox.jsx";
import { Typography } from "@mui/material";
import useResponsive from "../components/Hooks/useResponsive.jsx";
import MainChart from "../components/Charts/MainChart.jsx";
import Header from "../components/Header/Header.jsx";
import themeColors from "../Themes/themeColors.jsx";
import Statistics from "../components/Statistics/Statistics.jsx";
import CustomDatePicker from "../components/Inputs/CustomDatePicker.jsx";
import CustomSelect from "../components/Buttons/CustomSelect.jsx";
import PredictionChart from "../components/Charts/PredictionChart.jsx";

function HomePage() {
  const { isMediumScreen } = useResponsive();

  const [period, setPeriod] = useState("2025-06-10");
  const [predictPeriod, setPredictPeriod] = useState("");
  const [equipment, setEquipment] = useState("TD7");
  const [predictEquipment, setPredictEquipment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [lastChanged, setLastChanged] = useState("");
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [equipmentOptions, setEquipmentOptions] = useState([]);
  const [customEquipments, setCustomEquipments] = useState([]);

  const predictPeriodOptions = [
    { value: "2025-06-10", label: "Next Week" },
    { value: "2025-05-17", label: "Next Month" },
  ];

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
    setCustomEquipments([]);
  }, [period, equipment]);

  return (
    <CustomBox backgroundColor={themeColors.palette.primary.main}>
      <Header
        equipmentX={setEquipment}
        periodX={setPeriod}
        optionsEquipments={setEquipmentOptions}
        lastChanged={lastChanged}
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
            <Typography
              display={isMediumScreen ? "none" : "flex"}
              fontSize={"1.5em"}
              fontWeight={"bold"}
              alignItems={"start"}
              width={"100%"}
            >
              Energy Consumption Trends
            </Typography>

            <CustomBox
              flexDirection={isMediumScreen ? "column" : "row"}
              gap={"1em"}
              maxWidth={"auto"}
              alignItems={"start"}
              justifyContent={"end"}
            >
              <CustomSelect
                multiple={true}
                options={equipmentOptions}
                maxWidth={"6em"}
                // size={"small"}
                label={"Equipments"}
                value={customEquipments}
                onChange={(e) => {
                  setCustomEquipments(e.target.value);
                  setLastChanged("custom");
                }}
              />
              <CustomDatePicker
                label={"Start date"}
                onChange={handleStartDate}
                lastChanged={lastChanged}
              />
              <CustomDatePicker
                lastChanged={lastChanged}
                label={"End date"}
                onChange={handleEndDate}
              />
            </CustomBox>
          </CustomBox>
          <CustomBox gap={"1em"}>
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
            <CustomBox>
              <CustomBox flexDirection={"row"} justifyContent={"space-between"}>
                <Typography
                  display={isMediumScreen ? "none" : "flex"}
                  fontSize={"1.5em"}
                  fontWeight={"bold"}
                  alignItems={"start"}
                  width={"100%"}
                >
                  Prediction Energy Consumption
                </Typography>

                <CustomBox
                  flexDirection={isMediumScreen ? "column" : "row"}
                  gap={"1em"}
                  maxWidth={"auto"}
                  alignItems={"start"}
                  justifyContent={"end"}
                >
                  <CustomSelect
                    customOptions={"ALL"}
                    options={equipmentOptions}
                    maxWidth={"6em"}
                    label={"Equipments"}
                    value={predictEquipment}
                    onChange={(e) => setPredictEquipment(e.target.value)}
                    sx={{
                      boxShadow: 4,
                    }}
                  />
                  <CustomSelect
                    label="Period"
                    value={predictPeriod}
                    onChange={(e) => setPredictPeriod(e.target.value)}
                    options={predictPeriodOptions}
                    maxWidth={"12em"}
                    sx={{
                      boxShadow: 4,
                    }}
                  />
                </CustomBox>
              </CustomBox>
            </CustomBox>
            <CustomBox>
              <PredictionChart
                period={period}
                equipment={equipment}
                predictPeriod={predictPeriod}
                predictEquipment={predictEquipment}
                customEquipments={customEquipments}
                lastChanged={lastChanged}
                setTotalConsumption={setTotalConsumption}
              />
            </CustomBox>
          </CustomBox>
        </CustomBox>
      </CustomBox>
    </CustomBox>
  );
}

export default HomePage;
