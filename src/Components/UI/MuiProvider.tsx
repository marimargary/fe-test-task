import { ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FB9300",
      "400": "#FFA82E",
      "300": "#FFBB5C",
      "200": "#FFCE8A",
      "100": "#FFE1B7",
      "50": "#FFF4E5",
    },
    grey: {
      "900": "#212121",
      "800": "#424242 ",
      "700": "#616161",
      "600": "#757575",
      "500": "#9E9E9E",
      "400": "#BDBDBD",
      "300": "#E0E0E0",
      "200": "#EEEEEE",
      "100": "#F5F5F5",
      "50": "#FAFAFA",
    },
    warning: {
      main: "#FF3442",
    },
    background: {
      default: "#FB9300",
    },
  },
});

const MuiProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiProvider;
