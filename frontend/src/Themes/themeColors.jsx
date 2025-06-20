import { createTheme } from "@mui/material/styles";

const themeColors = createTheme({
  palette: {
    primary: {
      main: "#00cd03",
      dark: "#f4f4f4",
      contrastText: "#fff",
    },
    secondary: {
      main: "#00e5ff",
      contrastText: "#000",
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
