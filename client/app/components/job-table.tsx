"use client"
import {Spinner} from "@/app/components/spinner";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TablePagination
} from "@mui/material";
import {schemas} from "@/app/typings/schemas";
import {ChangeEventHandler, MouseEvent} from "react";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import {fetchPage, jobList, selectJob} from "@/app/redux/jobListSlice";

function formatEvents(events: schemas.Job['events']) {
  return events.length !== 0 ? `${events.length} event(s)` : 'None';
}

export default function JobTable() {
  const { status, error, details, page, items, offset, limit, item_total_count } = useAppSelector(jobList)
  const dispatch = useAppDispatch()

  function handleChangePage(event: MouseEvent<HTMLButtonElement> | null, newPage: number) {
    if (newPage < 0) {
      throw new Error(`newPage should be a positive integer (actual ${newPage})`)
    }
    dispatch(fetchPage({ offset: newPage * limit, limit}))
  }

  const handleChangeRowsPerPage: ChangeEventHandler<HTMLInputElement> = (event): void => {
    const newLimit = Number(event.target.value)
    dispatch(fetchPage({ offset, limit: newLimit}))
  }

  switch (status) {
    case "error":
      console.log(details)
      return <span>{error}</span>
    case "pending":
      return <Spinner/>
  }

  const handleJobClick = (job: schemas.Job) => {
    dispatch(selectJob(job))
  }

  return <Box sx={{width: '100%', padding: 2}}>
    <TableContainer>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Events</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((job: schemas.Job) => (<TableRow
              key={job.id}
              onClick={() => handleJobClick(job)}
            >
              <TableCell>{job.id}</TableCell>
              <TableCell>{job.role}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>{formatEvents(job.events)}</TableCell>
            </TableRow>))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={5}
              rowsPerPageOptions={[1, 2, 5, 10, 25, 50]}
              count={item_total_count}
              rowsPerPage={limit}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  </Box>
}