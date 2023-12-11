import {schemas} from "@/app/typings/schemas";

export function formatJobName(job: schemas.Job): string {
  return `${job.role} at ${job.company}`
}