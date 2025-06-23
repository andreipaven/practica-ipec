import React, { useEffect, useState } from "react";
import CustomBox from "../Containers/CustomBox.jsx";
import { Typography } from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import CustomSelect from "../Buttons/CustomSelect.jsx";
import themeColors from "../../Themes/themeColors.jsx";

function MobileNavBar({ onChangePeriod, onChangeEquipment }) {
  const [period, setPeriod] = useState("");
  const [equipment, setEquipment] = useState("");

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
    onChangePeriod(e.target.value);
  };
  const handleEquipmentChange = (e) => {
    setEquipment(e.target.value);
    onChangeEquipment(e.target.value);
  };

  const periodOptions = [
    { value: "2025-01-31", label: "Last Day" },
    { value: "2025-01-24", label: "Last Week" },
    { value: "2025-01-01", label: "Last Month" },
  ];
  const equipmentOptions = [
    { value: "TD7", label: "TD7" },
    { value: "TD6", label: "TD6" },
    { value: "TD5", label: "TD5" },
  ];

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
          minWidth={"8em"}
          sx={{
            boxShadow: 5,
          }}
        />
        <CustomSelect
          label="Equipment"
          value={equipment}
          onChange={handleEquipmentChange}
          options={equipmentOptions}
          maxWidth={"12em"}
          minWidth={"8em"}
          sx={{
            boxShadow: 5,
          }}
        />
      </CustomBox>
    </CustomBox>
  );
}

export default MobileNavBar;
