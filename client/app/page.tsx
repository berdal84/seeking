import JobTable from "@/app/job-table";
import {Suspense} from "react";

export default async function Home() {
  return (
    <main className="flex">
      <Suspense>
        <h1>Seeking</h1>
        <JobTable/>
      </Suspense>
    </main>
  )
}

