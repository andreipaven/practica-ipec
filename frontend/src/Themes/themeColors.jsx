import { createTheme } from "@mui/material/styles";

const themeColors = createTheme({
  palette: {
    primary: {
      main: "#efefef",
      dark: "#f4f4f4",
      contrastText: "#cff",
      light: "#fff",
    },
    secondary: {
      main: "#00c4ff",
      contrastText: "#000",
      dark: "#0261aa",
    },
    success: {
      main: "#fff",
      light: "#00cd03",
      dark: "#02b105",
    },
    error: {
      main: "#ff0000",
    },
  },
});

export default themeColors;
