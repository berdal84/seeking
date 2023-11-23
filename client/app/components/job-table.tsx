"use client"

import useJobs from "@/app/hooks/useJobs";
import {Spinner} from "@/app/components/spinner";

export default function JobTable() {

  const { data, error, isLoading } = useJobs()

  if ( isLoading || !data) {
    return <Spinner/>
  }
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
      data.item.map( ({id, company, role, url, notes, events})  => (
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