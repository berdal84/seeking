import { schemas } from './schemas'
const API_URL = 'http://localhost:8000'  // TODO: use env vars

async function getJobs(): Promise<schemas.JobPage> {
  const res = await fetch(`${API_URL}/job/`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default {
  getJobs
}