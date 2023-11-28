import { schemas } from '@/app/typings/schemas'

export namespace SeekingAPI {

  export const BASE_URL = 'http://127.0.0.1:8000'  // TODO: use env vars

  export async function createJob(job: schemas.JobCreate): Promise<schemas.Job> {
    const res = await fetch(
      `${BASE_URL}/job/`,
      {
        method: 'POST',
        body: JSON.stringify(job),
        headers: {
          'Content-Type': 'application/json',
        },
      })

    if (!res.ok) {
      throw new Error(await res.json())
    }

    return res.json()
  }

  export async function getJobPage( offset: number, limit: number): Promise<schemas.JobPage> {
    const res = await fetch(
      `${BASE_URL}/job/?offset=${offset}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

    if (!res.ok) {
      throw new Error(await res.json())
    }

    return res.json()
  }
}