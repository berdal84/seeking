import { schemas } from '@/app/typings/schemas'

export namespace SeekingAPI {

  export const BASE_URL = 'http://127.0.0.1:8000'  // TODO: use env vars

  export namespace event {

    export async function create(jobId: schemas.Job['id'], event: schemas.EventCreate): Promise<schemas.Event> {
      return await internal.fetchAs<schemas.Event>(
        `${BASE_URL}/job/${jobId}/event/`,
        {
          method: 'POST',
          body: event,
          headers: {
            'Content-Type': 'application/json',
          },
        })
    }

    export async function update(event: schemas.Event): Promise<schemas.Event> {
      const eventUpdate: schemas.EventUpdate = {
        type: event.type,
        date: event.date,
        notes: event.notes,
      }
      return await internal.fetchAs<schemas.Event>(
        `${BASE_URL}/event/${event.id}/`,
        {
          method: 'POST',
          body: eventUpdate,
          headers: {
            'Content-Type': 'application/json',
          },
        })
    }

    export async function destroy(id: schemas.Event['id']): Promise <schemas.Event> {
      return await internal.fetchAs<schemas.Event>(
        `${BASE_URL}/event/${id}/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
    }
  }

  export namespace job {

    export async function create(job: schemas.JobCreate): Promise<schemas.Job> {
      return await internal.fetchAs<schemas.Job>(
        `${BASE_URL}/job/`,
        {
          method: 'POST',
          body: job,
          headers: {
            'Content-Type': 'application/json',
          },
        })
    }

    export async function destroy(id: schemas.Job['id']): Promise < schemas.Job > {
      return await internal.fetchAs<schemas.Job>(
        `${BASE_URL}/job/${id}/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
    }

    export async function getPage(offset: number, limit: number): Promise<schemas.JobPage> {
      return await internal.fetchAs<schemas.JobPage>(
        `${BASE_URL}/job/?offset=${offset}&limit=${limit}`,
        {
          method: 'GET'
        })
    }
  }

  namespace internal {
    type TOptions<RequestT> = {
      method?: 'GET' | 'POST' | 'DELETE' | 'PUT';
      body?: RequestT;
      headers?: Record<string, string>;
    }
    export async function fetchAs<
      ResponseT,
      Options extends TOptions<any> = {}
    >(
      url: string,
      options: Options
    ): Promise<ResponseT> {
      const res = await fetch(
        url,
        {
          method: options.method ?? 'GET',
          headers: options.headers ?? {'Content-Type': 'application/json'},
          body: options.body ? JSON.stringify(options.body) : undefined,
        })

      if (!res.ok) {
        throw new Error(await res.json())
      }

      return res.json()
    }
  }
}