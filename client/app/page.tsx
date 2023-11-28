"use client"
import {createTheme, ThemeProvider} from "@mui/material";
import {Provider} from "react-redux";
import {store} from "./redux/store"
import Home from "@/app/components/home";

const theme = createTheme({
  palette: {
    primary: {
      main: '#309fbe',
    },
    secondary: {
      main: '#b972ff',
    },
    text: {
      primary: '#222b3d'
    }
  }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Home/>
      </Provider>
    </ThemeProvider>
  )
}

