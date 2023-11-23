
export namespace schemas {
  export type Page<T> = {
    page_index: number,
    item: Array<T>,
    item_total_count: number
  }

  export type Job = {
    id: number,
    role: string
    company: string
    url: string
    notes: string
    events: Array<Event>
  }

  export type Event = {
    id: number
    type: string // TODO: enum
    date: string
    notes: string
  }

  export type JobPage = Page<Job>
  export type JobCreate = Pick<Job, 'role' | 'company'> | Pick<Partial<Job>, 'url' | 'notes'>

  export function isJobCreate(data: unknown): data is JobCreate {
    // TODO: use FastAPIs schemas (see OpenAI specs)
    return 'role' in data && 'company' in data;
  }
}
