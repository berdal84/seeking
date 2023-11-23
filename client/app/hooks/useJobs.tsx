import useSWR from "swr";
import {schemas} from "@/app/typings/schemas";
import api from '@/app/utilities/api'

const fetcher = ( input: NodeJS.fetch.RequestInfo,
                  init?: RequestInit,) => fetch(`${api.BASE_URL}${input}`, init).then(res => res.json())

export default function useJobs(page = 0, limit = 10) {
  const params = new URLSearchParams({page, limit})
  const { data, error, isLoading } = useSWR<schemas.JobPage>(`/job/?${params.toString()}`, fetcher)

  return {
    data,
    isLoading,
    isError: error
  }
}
