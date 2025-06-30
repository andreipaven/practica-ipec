import React from "react";
import CustomBox from "../Containers/CustomBox.jsx";
import MobileNavBar from "../NavBars/MobileNavBar.jsx";
import themeColors from "../../Themes/themeColors.jsx";
import useResponsive from "../Hooks/useResponsive.jsx";

function Header({ periodX, equipmentX, optionsEquipments, lastChanged }) {
  const { isMediumScreen } = useResponsive();
  return (
    <CustomBox width={"100%"}>
      <CustomBox
        maxWidth={"100em"}
        padding={isMediumScreen ? "1em" : "1em 3em"}
        backgroundColor={themeColors.palette.primary.light}
      >
        <MobileNavBar
          optionsEquipments={optionsEquipments}
          onChangePeriod={periodX}
          onChangeEquipment={equipmentX}
          lastChanged={lastChanged}
        />
      </CustomBox>
    </CustomBox>
  );
}

export default Header;
