"use client"
import {createTheme, ThemeProvider} from "@mui/material";
import {Provider} from "react-redux";
import {store} from "./redux/store"
import Home from "@/app/components/home";
import {LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Home/>
        </LocalizationProvider>
      </Provider>
    </ThemeProvider>
  )
}

