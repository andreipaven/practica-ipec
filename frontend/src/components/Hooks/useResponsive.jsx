import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const useResponsive = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.down("xl"));

  return { isSmallScreen, isExtraLargeScreen, isMediumScreen, isLargeScreen };
};

export default useResponsive;
