"use client"
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer, TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import {schemas} from "@/app/typings/schemas";

export type JobDetailsProps = {
  job: schemas.Job | null
}

export default function JobDetails({job}: JobDetailsProps) {

  return <Box sx={{width: '100%'}}>
    <Paper sx={{width: '100%', padding: 2}}>
      <Box sx={{ mb: 3}}>
        <h3>
          {job ? `${job.role} at ${job.company}.` : 'No job selected'}
        </h3>
      </Box>
      { job && <>
      <Box sx={{ mb: 3}}>
          <h4>Notes</h4>
          <p>
            {job?.notes}
          </p>
      </Box>
      <h4>Event(s)</h4>
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
      </TableContainer></>}
    </Paper>
  </Box>
}