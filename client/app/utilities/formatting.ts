import {schemas} from "@/app/typings/schemas";

export function formatJobName(job: schemas.Job): string {
  return `${job.role} at ${job.company}`
}

export function formatEventCount(events: schemas.Job['events']) {
  return events.length !== 0 ? `${events.length} event(s)` : 'None';
}