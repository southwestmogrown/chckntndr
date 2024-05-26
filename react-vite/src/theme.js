import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f0ae07",
      text: "#e70331"
    },
    secondary: {
      main: "#f0c24fd7",
      text: "#88041ecb"
    }
  },
  typography: {
    fontFamily: [
      "Caveat",
    ],
    button: {
      fontWeight: "bold",
      fontSize: 88
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

});

export default theme