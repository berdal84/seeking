import useSWR from "swr";
import {schemas} from "@/app/typings/schemas";
import api from '@/app/utilities/api'

const fetcher = ( input: NodeJS.fetch.RequestInfo,
                  init?: RequestInit,) => fetch(`${api.BASE_URL}${input}`, init).then(res => res.json())

export default function useJobs({offset = 0, limit = 10}) {
  const path = `/job/?offset=${offset}&limit=${limit}`
  const { data, error, isLoading, mutate } = useSWR<schemas.JobPage>(path, fetcher )

  return {
    data,
    isLoading,
    error,
    mutate
  }
}
