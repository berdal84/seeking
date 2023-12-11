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
import CreateEventDialog from "@/app/components/create-event-dialog";

export default function Home() {
  const [jobDialogOpen, setJobDialogOpen] = useState(false);
   const {offset, limit, selected} = useAppSelector(jobList)
  const dispatch = useAppDispatch()

  const handleNewJobBtnClick = () => {
    setJobDialogOpen(true);
  };

  const handleCloseJobDialog = async (newJob: schemas.JobCreate | null) => {
    setJobDialogOpen(false);
    refreshPage()
  };

  const refreshPage = useCallback( () => {
    dispatch(fetchPage({offset, limit}))
  }, [dispatch, offset, limit])


  useEffect(() => {
    refreshPage()
  }, [refreshPage]);

  return (
    <Box sx={{width: '100%', mb: 2}}>
      <SearchAppBar/>
      <Grid container spacing={4} sx={{padding: 2}}>
        <Grid item xs={4} sx={{padding: 2}}>
          <JobDetails job={selected}/>
        </Grid>
        <Grid item xs={8} sx={{padding: 2}}>
          <Box sx={{padding: 2}}>
            <Button variant="outlined" onClick={handleNewJobBtnClick}>New Job</Button>
            <Button variant="outlined" onClick={refreshPage}>Refresh</Button>
          </Box>
          <JobTable/>
        </Grid>
      </Grid>
      <CreateJobDialog open={jobDialogOpen} onClose={handleCloseJobDialog} />
    </Box>
  )
}

