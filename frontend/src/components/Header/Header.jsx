import React from "react";
import CustomBox from "../Containers/CustomBox.jsx";
import MobileNavBar from "../NavBars/MobileNavBar.jsx";
import themeColors from "../../Themes/themeColors.jsx";

function Header(props) {
  return (
    <CustomBox width={"100%"}>
      <CustomBox
        maxWidth={"100em"}
        padding={"1em"}
        backgroundColor={themeColors.palette.primary.light}
      >
        <MobileNavBar />
      </CustomBox>
    </CustomBox>
  );
}

export default Header;
