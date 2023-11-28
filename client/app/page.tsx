"use client"
import {useState} from "react";
import {Box, Button, Container, createTheme, ThemeProvider} from "@mui/material";
import {schemas} from "@/app/typings/schemas";
import SearchAppBar from "@/app/components/app-bar";
import JobTable from "@/app/components/job-table";
import CreateJobDialog from "@/app/components/create-job-dialog";

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
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = async (newJob: schemas.JobCreate | null) => {
    setOpen(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{width: '100%', mb: 2}} fixed={true}>
        <SearchAppBar/>
        <h3>Job List</h3>
        <Box sx={{mb: 2}}>
          <Button variant="outlined" onClick={handleClickOpen}>New Job</Button>
        </Box>
        <JobTable/>
        <CreateJobDialog open={open} onClose={handleClose} />
      </Container>
    </ThemeProvider>
  )
}

