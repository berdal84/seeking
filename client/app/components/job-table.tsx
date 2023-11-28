"use client"
import {Spinner} from "@/app/components/spinner";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Button,
  TablePagination
} from "@mui/material";
import {schemas} from "@/app/typings/schemas";
import {ChangeEventHandler, MouseEvent} from "react";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import {addPage, loading} from "@/app/redux/jobSlice";
import {SeekingAPI} from "@/app/utilities/seeking-api";

export default function JobTable() {
  const { items, isLoading, item_total_count, limit, offset } = useAppSelector(state => state.job)
  const dispatch = useAppDispatch()
  const page = Math.ceil(offset / limit) // zero-based page index

  if (isLoading || !items) {
    return <Spinner/>
  }

  function handleChangePage(event: MouseEvent<HTMLButtonElement> | null, newPage: number) {
    if (newPage < 0) {
      return
    }

    // TODO: use middle ware to handle Promises

    dispatch(loading({ isLoading: true}))
    SeekingAPI.getJobPage(newPage * limit, limit)
      .then( page => {
        dispatch(addPage(page))
        dispatch(loading({ isLoading: false}))
      })
  }

  const handleChangeRowsPerPage: ChangeEventHandler<HTMLInputElement> = (event): void => {
    const newLimit = Number(event.target.value)

    // TODO: use middle ware to handle Promises

    dispatch(loading({ isLoading: true}))
    SeekingAPI.getJobPage(offset, newLimit)
      .then( page => {
        dispatch(addPage(page))
        dispatch(loading({ isLoading: false}))
      })
  }

  return <Box sx={{width: '100%'}}>
    <Paper sx={{width: '100%', mb: 2}}>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
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
            {items.map((job: schemas.Job) => (<TableRow
                key={job.id}
              >
                <TableCell component="th" scope="row">
                  {job.role}
                </TableCell>
                <TableCell align="right">{job.company}</TableCell>
                <TableCell align="right">{job.url}</TableCell>
                <TableCell align="right">{job.notes}</TableCell>
                <TableCell align="right">{job.events.length} event(s)</TableCell>
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
    </Paper>
  </Box>
}