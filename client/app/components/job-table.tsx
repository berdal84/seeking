"use client"

import useJobs from "@/app/hooks/useJobs";
import {Spinner} from "@/app/components/spinner";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {schemas} from "@/app/typings/schemas";

export default function JobTable() {

  const { data, error, isLoading } = useJobs()

  if ( isLoading || !data) {
    return <Spinner/>
  }
  return <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Role</TableCell>
          <TableCell align="right">Company</TableCell>
          <TableCell align="right">URL</TableCell>
          <TableCell align="right">Notes</TableCell>
          <TableCell align="right">Events</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.item.map((job: schemas.Job) => (
          <TableRow
            key={job.id}
          >
            <TableCell component="th" scope="row">
              {job.role}
            </TableCell>
            <TableCell align="right">{job.company}</TableCell>
            <TableCell align="right">{job.url}</TableCell>
            <TableCell align="right">{job.notes}</TableCell>
            <TableCell align="right">{job.events.length} event(s)</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}