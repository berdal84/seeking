"use client"
import {
  Box, Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer, TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import {schemas} from "@/app/typings/schemas";
import {formatJobName} from "@/app/utilities/formatting";
import CreateEventDialog from "@/app/components/create-event-dialog";
import {useState} from "react";
import {useAppSelector} from "@/app/redux/hooks";
import {jobList} from "@/app/redux/jobListSlice";

export type JobDetailsProps = {
  job: schemas.Job | null
}

export default function JobDetails({job}: JobDetailsProps) {
  const [eventDialogOpen, setEventDialogOpen] = useState(false);

  const handleCloseEventDialog = async (newEvent: schemas.EventCreate | null) => {
    setEventDialogOpen(false);
  };

  const handleAddEventBtnClick = () => {
    setEventDialogOpen(true);
  };

  return <Box sx={{width: '100%'}}>
    <Paper sx={{width: '100%', padding: 2}}>
      <Box sx={{ mb: 3}}>
        <h3>
          {job ? formatJobName(job) : 'No job selected'}
        </h3>
      </Box>
      { job && <>
        <Box sx={{ mb: 3}}>
            <h4>Notes</h4>
            <p>
              {job.notes}
            </p>
        </Box>
        <h4>Event(s)</h4>
        <Box sx={{mb: 2}}>
            <Button variant="outlined" onClick={handleAddEventBtnClick}>Add Event</Button>
        </Box>
        <TableContainer>
          <Table padding="none" size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {job.events?.map((event: schemas.Event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.id}</TableCell>
                  <TableCell>{event.type}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.notes}</TableCell>
                </TableRow>))}
            </TableBody>
          </Table>
        </TableContainer>
        { job && <CreateEventDialog open={eventDialogOpen}
                                    onClose={handleCloseEventDialog}
                                    job={job} />}
      </>}
    </Paper>

  </Box>
}