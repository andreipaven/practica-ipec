import React, { useState } from "react";
import CustomBox from "../Containers/CustomBox.jsx";
import { Typography } from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import CustomSelect from "../Buttons/CustomSelect.jsx";
import themeColors from "../../Themes/themeColors.jsx";
import useResponsive from "../Hooks/useResponsive.jsx";

function MobileNavBar() {
  const { isSmallScreen } = useResponsive();
  const [period, setPeriod] = useState("");
  const [equipment, setEquipment] = useState("");

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
      <CustomBox flexDirection={"row"} width={"fit-content"} gap={"1em"}>
        <ElectricBoltIcon
          sx={{
            backgroundColor: themeColors.palette.secondary.main,
            color: themeColors.palette.primary.light,
            fontSize: "3em",
            boxShadow: 10,
            borderRadius: "16px",
          }}
        />
        <Typography
          display={isSmallScreen ? "none" : "flex"}
          fontSize="2em"
          fontWeight="bold"
          sx={{
            fontFamily: '"Roboto Slab", serif',
            textShadow: "1px 5px 8px rgba(0,0,0,0.6)",
          }}
        >
          Energy Tracker
        </Typography>
      </CustomBox>
      <CustomBox width={"fit-content"} flexDirection={"row"} gap={"2em"}>
        <CustomSelect
          label="Period"
          value={period}
          onChange={handlePeriodChange}
          options={periodOptions}
          maxWidth={"12em"}
          minWidth={"8em"}
        />
        <CustomSelect
          label="Equipment"
          value={equipment}
          onChange={handleEquipmentChange}
          options={equipmentOptions}
          maxWidth={"12em"}
          minWidth={"8em"}
        />
      </CustomBox>
    </CustomBox>
  );
}

export default MobileNavBar;
