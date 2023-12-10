"use client"
import {useCallback, useEffect, useState} from "react";
import {Box, Button, Container} from "@mui/material";
import {schemas} from "@/app/typings/schemas";
import SearchAppBar from "@/app/components/app-bar";
import JobTable from "@/app/components/job-table";
import CreateJobDialog from "@/app/components/create-job-dialog";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import {fetchPage, jobList} from "@/app/redux/jobListSlice";

export default function Home() {
  const [open, setOpen] = useState(false);
  const {offset, limit} = useAppSelector(jobList)
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
      <h3>Job List</h3>
      <Box sx={{mb: 2}}>
        <Button variant="outlined" onClick={handleClickOpen}>New Job</Button>
        <Button variant="outlined" onClick={refreshPage}>Refresh</Button>
      </Box>
      <JobTable/>
      <CreateJobDialog open={open} onClose={handleClose} />
    </Container>
  )
}

