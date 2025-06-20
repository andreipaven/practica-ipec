import React from "react";
import CustomBox from "../Containers/CustomBox.jsx";
import MobileNavBar from "../NavBars/MobileNavBar.jsx";

function Header(props) {
  return (
    <CustomBox width={"100%"}>
      <CustomBox maxWidth={"100em"} padding={"1em"}>
        <MobileNavBar />
      </CustomBox>
    </CustomBox>
  );
}

export default Header;
