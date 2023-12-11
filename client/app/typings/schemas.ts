
export namespace schemas {
  export type Page<T> = {
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

  export type EventCreate = Omit<Event, 'id'>
  export type EventUpdate = Partial<Omit<Event, 'id'>>
  export type JobPage = Page<Job>
  export type JobCreate = Omit<Job, 'id' | 'events'>
}
