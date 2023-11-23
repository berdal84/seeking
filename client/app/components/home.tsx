"use client"
import JobTable from "@/app/components/job-table";
import {Button, Dialog, DialogTrigger, Modal} from "react-aria-components";
import CreateJobForm from "@/app/components/create-job-form";
import {schemas} from "@/app/typings/schemas";
import api from "@/app/utilities/api";

export default function Home() {

  return (
    <main className="flex">
      <h1>Seeking</h1>
      <JobTable/>
      <DialogTrigger>
        <Button>New Job</Button>
        <Modal>
          <Dialog>
            {({ close }) => (
              <CreateJobForm onSubmit={async (newJob: schemas.JobCreate) => {
                await api.createJob(newJob)
                close()
              }}/>
            )}
          </Dialog>
        </Modal>
      </DialogTrigger>
    </main>
  )
}

