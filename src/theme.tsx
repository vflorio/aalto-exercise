import { createTheme } from "@mui/material";

export const darkBlue = "#003479";
export const lightBlue = "#00a0df";
export const purple = "#644c79";
export const paperWhite = "#f4f4f4";

export const tableBasis = 830;
export const filtersBasis = 330;
export const gap = 60;

export const maxWidth = filtersBasis + gap + tableBasis;
export const mobileMediaQuery = "(max-width: 768px)";

export const theme = (spacing: number) =>
  createTheme({
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
    spacing,
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
