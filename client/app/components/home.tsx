"use client"
import {useCallback, useEffect, useState} from "react";
import {Box, Button, Container, Divider, Grid} from "@mui/material";
import {schemas} from "@/app/typings/schemas";
import SearchAppBar from "@/app/components/app-bar";
import JobTable from "@/app/components/job-table";
import CreateJobDialog from "@/app/components/create-job-dialog";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import {fetchPage, jobList} from "@/app/redux/jobListSlice";
import JobDetails from "@/app/components/job-details";

export default function Home() {
  const [open, setOpen] = useState(false);
  const {offset, limit, selected} = useAppSelector(jobList)
  const dispatch = useAppDispatch()
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = async (newJob: schemas.JobCreate | null) => {
    setOpen(false);
    refreshPage()
  };
  const refreshPage = useCallback( () => {
    dispatch(fetchPage({offset, limit}))
  }, [dispatch, offset, limit])

  useEffect(() => {
    refreshPage()
  }, [refreshPage]);

  return (
    <Container sx={{width: '100%', mb: 2}} fixed={true}>
      <SearchAppBar/>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <h4>Job List</h4>
          <Box sx={{mb: 2}}>
            <Button variant="outlined" onClick={handleClickOpen}>New Job</Button>
            <Button variant="outlined" onClick={refreshPage}>Refresh</Button>
          </Box>
          <JobTable/>
        </Grid>
        <Grid item xs={4}>
          <h4>Selected Job</h4>
          <Box sx={{mb: 2}}>
            <Button variant="outlined" disabled={!selected}>Add Event</Button>
          </Box>
          <JobDetails job={selected}/>
        </Grid>
      </Grid>
      <CreateJobDialog open={open} onClose={handleClose} />
    </Container>
  )
}

