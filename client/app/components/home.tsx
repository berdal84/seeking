"use client"
import JobTable from "@/app/components/job-table";
import {useState} from "react";
import {schemas} from "@/app/typings/schemas";
import CreateJobDialog from "@/app/components/create-job-dialog";
import {Button} from "@mui/base";

export default function Home() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = async (newJob: schemas.JobCreate) => {
    setOpen(false);
  };

  return (
    <main className="flex">
      <h1>Seeking</h1>
      <h2>Job List</h2>
      <JobTable/>
      <Button variant="outlined" onClick={handleClickOpen}>
        New Job
      </Button>
      <CreateJobDialog open={open} onClose={handleClose} />
    </main>
  )
}

