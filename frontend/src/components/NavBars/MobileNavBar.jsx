import React, { useEffect, useState } from "react";
import CustomBox from "../Containers/CustomBox.jsx";
import { Typography } from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import CustomSelect from "../Buttons/CustomSelect.jsx";
import themeColors from "../../Themes/themeColors.jsx";
import { fetchGetEquipments } from "../../Services/reportService.js";
import useResponsive from "../Hooks/useResponsive.jsx";

function MobileNavBar({
  onChangePeriod,
  onChangeEquipment,
  optionsEquipments,
  lastChanged,
}) {
  const { isSmallScreen } = useResponsive();
  const [period, setPeriod] = useState("");
  const [equipment, setEquipment] = useState("");
  const [equipmentOptions, setEquipmentsOptions] = useState([]);

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
    onChangePeriod(e.target.value);
  };
  const handleEquipmentChange = (e) => {
    setEquipment(e.target.value);
    onChangeEquipment(e.target.value);
  };

  const periodOptions = [
    { value: "2025-06-16", label: "Last Day" },
    { value: "2025-06-11", label: "Last Week" },
    { value: "2025-05-17", label: "Last Month" },
    { value: "2025-01-01", label: "Last Year" },
  ];

  useEffect(() => {
    if (lastChanged === "custom") {
      setPeriod("");
      setEquipment("");
    }
  }, [lastChanged]);

  useEffect(() => {
    fetchGetEquipments().then((result) => {
      const equipmentList = [];
      if (result.success) {
        const rawData = result.result;
        rawData.forEach((item) => {
          const rawEquipment = {
            value: item.equipments,
            label: item.equipments,
          };
          equipmentList.push(rawEquipment);
        });
      }

      setEquipmentsOptions(equipmentList);
      optionsEquipments(equipmentList);
    });
  }, []);

  return (
    <CustomBox flexDirection={"row"} justifyContent={"space-between"}>
      <CustomBox flexDirection={"row"} width={"fit-content"} gap={"1em"}>
        <ElectricBoltIcon
          sx={{
            backgroundColor: themeColors.palette.secondary.main,
            color: themeColors.palette.primary.light,
            fontSize: "3em",
            boxShadow: 8,
            borderRadius: "16px",
          }}
        />
        <Typography
          display={isSmallScreen ? "none" : "flex"}
          fontSize={"2em"}
          fontWeight={"bold"}
          sx={{
            textShadow: "4px 6px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Energy Tracker
        </Typography>
      </CustomBox>

      <CustomBox width={"fit-content"} flexDirection={"row"} gap={".5em"}>
        <CustomSelect
          label="Period"
          value={period}
          onChange={handlePeriodChange}
          options={periodOptions}
          maxWidth={"12em"}
          sx={{
            boxShadow: 4,
          }}
        />
        <CustomSelect
          label="Equipment"
          value={equipment}
          onChange={handleEquipmentChange}
          options={equipmentOptions}
          maxWidth={"12em"}
          sx={{
            boxShadow: 4,
          }}
        />
      </CustomBox>
    </CustomBox>
  );
}

export default MobileNavBar;
