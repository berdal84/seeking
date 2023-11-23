import {useMemo} from "react";
import api from "@/app/api";
import {schemas} from "@/app/schemas";

export default async function JobTable() {

  const page: schemas.JobPage = await useMemo(() => api.getJobs(), [])

  return <table className="table-auto">
    <thead>
      <tr>
        <th>id</th>
        <th>company</th>
        <th>role</th>
        <th>url</th>
        <th>notes</th>
        <th>events</th>
      </tr>
    </thead>
    <tbody>
    {
      page.item.map( ({id, company, role, url, notes, events})  => (
        <tr key={id}>
          <th>{id}</th>
          <th>{company}</th>
          <th>{role}</th>
          <th>{url}</th>
          <th>{notes}</th>
          <th>{events.length} event(s)</th>
        </tr>
      ))
    }
    </tbody>
  </table>
}