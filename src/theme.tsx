import { createTheme } from "@mui/material";
import { darkBlue, lightBlue, paperWhite, purple } from "./constants";

export const theme = createTheme({
  typography: {
    fontFamily: [
      "Karbon",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  spacing: 10,
  palette: {
    mode: "light",
    primary: {
      main: darkBlue,
      light: lightBlue,
    },
    secondary: {
      main: purple,
    },
    background: {
      paper: paperWhite,
    },
  },
});
