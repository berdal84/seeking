"use client"
import {useEffect, useState} from "react";
import {Box, Button, Container, createTheme} from "@mui/material";
import {schemas} from "@/app/typings/schemas";
import SearchAppBar from "@/app/components/app-bar";
import JobTable from "@/app/components/job-table";
import CreateJobDialog from "@/app/components/create-job-dialog";
import {useAppDispatch} from "@/app/redux/hooks";
import {addPage, clearCache, loading} from "@/app/redux/jobSlice";
import {SeekingAPI} from "@/app/utilities/seeking-api";

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

export default function Home() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch()
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = async (newJob: schemas.JobCreate | null) => {
    setOpen(false);
  };
  function handleRefresh() {

    // TODO: use middle ware to handle Promises

    dispatch(clearCache())
    dispatch(loading({ isLoading: true}))
    SeekingAPI.getJobPage(0, 10)
      .then( page => {
        dispatch(addPage(page))
        dispatch(loading({ isLoading: false}))
      })
  }

  useEffect(() => {

    // TODO: use middle ware to handle Promises

    dispatch(loading({ isLoading: true}))
    SeekingAPI
      .getJobPage(0, 10)
      .then( page => {
        dispatch(addPage(page))
        dispatch(loading({ isLoading: false}))
      })

  }, []);

  return (
    <Container sx={{width: '100%', mb: 2}} fixed={true}>
      <SearchAppBar/>
      <h3>Job List</h3>
      <Box sx={{mb: 2}}>
        <Button variant="outlined" onClick={handleClickOpen}>New Job</Button>
        <Button variant="outlined" onClick={handleRefresh}>Refresh</Button>
      </Box>
      <JobTable/>
      <CreateJobDialog open={open} onClose={handleClose} />
    </Container>
  )
}

