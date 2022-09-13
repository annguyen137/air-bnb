import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 744,
      md: 950,
      lg: 1128,
      xl: 1440,
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: false,
      },

      styleOverrides: {
        root: {
          maxWidth: "1760px",
          paddingLeft: "24px",
          paddingRight: "24px",
          "@media (min-width: 744px)": {
            paddingLeft: "40px",
            paddingRight: "40px",
          },
          "@media (min-width: 1128px)": {
            paddingLeft: "80px",
            paddingRight: "80px",
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
        focusRipple: false,
      },
      styleOverrides: {
        root: {
          minWidth: "unset !important",
          "&:hover": {
            backgroundColor: "unset !important",
          },
        },
      },
    },
  },
});

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
