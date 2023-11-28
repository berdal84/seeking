"use client"

import useJobs from "@/app/hooks/useJobs";
import {Spinner} from "@/app/components/spinner";
import {Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow} from "@mui/material";
import {schemas} from "@/app/typings/schemas";
import {Button, TablePagination} from "@mui/base";
import {ChangeEventHandler, MouseEvent, useState} from "react";
import {Box} from "@mui/system";

export default function JobTable() {

  const [{limit, offset}, setState] = useState({offset: 0, limit: 10})
  const page = Math.ceil(offset / limit) // zero-based page index
  const { data, isLoading, mutate } = useJobs({limit, offset})

  if ( isLoading || !data) {
    return <Spinner/>
  }

  function handleChangePage( event: MouseEvent<HTMLButtonElement> | null, newPage: number) {
    if ( newPage < 0 ) {
      return
    }
    console.log('handleChangePage', newPage)
    setState(curr => ({...curr, offset: newPage * curr.limit  }))
  }

  const handleChangeRowsPerPage: ChangeEventHandler<HTMLInputElement> = (event): void => {
    const limit = Number(event.target.value)
    console.log('handleChangeRowsPerPage', limit)
    setState(curr => ({...curr, limit }))
  }

  async function handleRefresh() {
    return await mutate()
  }

  return <Box sx={{ width: '100%' }}>
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer component={Paper}>
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
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={5}
                rowsPerPageOptions={[1, 2, 5, 10, 25, 50]}
                count={data.item_total_count}
                rowsPerPage={limit}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              <TableCell>
                <Button onClick={handleRefresh}>Refresh</Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  </Box>
}