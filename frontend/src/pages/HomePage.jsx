import React from "react";
import CustomBox from "../components/Containers/CustomBox.jsx";
import { Typography } from "@mui/material";
import useResponsive from "../components/Hooks/useResponsive.jsx";
import LineChart from "../components/Charts/LineChart.jsx";

function HomePage() {
  const { isSmallScreen } = useResponsive();
  return (
    <CustomBox>
      <CustomBox>
        <CustomBox maxWidth={"100em"} padding={isSmallScreen ? "1em" : "3em"}>
          <Typography fontSize={"1.5em"} fontWeight={"bold"}>
            Diagrama pe anul trecut
          </Typography>
          <CustomBox>
            <LineChart />
          </CustomBox>
        </CustomBox>
      </CustomBox>
    </CustomBox>
  );
}

export default HomePage;
