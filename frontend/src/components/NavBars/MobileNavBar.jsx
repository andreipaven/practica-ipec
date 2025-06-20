import React, { useState } from "react";
import CustomBox from "../Containers/CustomBox.jsx";
import { Typography } from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import CustomSelect from "../Buttons/CustomSelect.jsx";

function MobileNavBar() {
  const [period, setPeriod] = useState("Day");
  const [equipment, setEquipment] = useState("All Equipments");

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };
  const handleEquipmentChange = (e) => {
    setEquipment(e.target.value);
  };

  const periodOptions = [
    { value: "day", label: "Day" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
  ];
  const equipmentOptions = [
    { value: "TD3", label: "TD3" },
    { value: "CS3", label: "CS3" },
    { value: "MM3", label: "MM3" },
  ];

  return (
    <CustomBox flexDirection={"row"} justifyContent={"space-between"}>
      <CustomBox flexDirection={"row"} width={"fit-content"}>
        <ElectricBoltIcon />
        <Typography>Energy Tracker</Typography>
      </CustomBox>
      <CustomBox flexDirection={"row"} width={"fit-content"} gap={"1em"}>
        <CustomBox width={"fit-content"}>
          <CustomSelect
            label="Period"
            value={period}
            onChange={handlePeriodChange}
            options={periodOptions}
            placeholder="Select a period"
            maxWidth={"12em"}
            minWidth={"8em"}
          />
        </CustomBox>
        <CustomBox width={"fit-content"}>
          <CustomSelect
            label="Period"
            // value={}
            onChange={handlePeriodChange}
            options={periodOptions}
            placeholder="Select a period"
            maxWidth={"12em"}
            minWidth={"8em"}
          />
        </CustomBox>
      </CustomBox>
    </CustomBox>
  );
}

export default MobileNavBar;
