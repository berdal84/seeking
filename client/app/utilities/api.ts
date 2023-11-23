import { schemas } from '@/app/typings/schemas'
const BASE_URL = 'http://127.0.0.1:8000'  // TODO: use env vars

async function createJob(job: schemas.JobCreate): Promise<schemas.Job> {
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


export default {
  BASE_URL,
  createJob
}