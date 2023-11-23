"use client"
import {Form, Button, Heading, Input, Label, TextField, FieldError} from "react-aria-components";
import {FormEvent, useState} from "react";
import {schemas} from "@/app/typings/schemas";

export type Props = {
  onSubmit: (data: schemas.JobCreate) => Promise<void>
}

type State = {
  status: string | null
}

export default function CreateJobForm({ onSubmit }: Props) {

  const [state, setState] = useState<State>({
    status: null
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let data: unknown = Object.fromEntries(new FormData(event.currentTarget));

    // Ensure match schema
    if ( !schemas.isJobCreate(data) ) {
      setState({status: `form is invalid`})
      return
    }

    const newJob: schemas.JobCreate = data
    setState({status: `submitting... ${JSON.stringify(newJob)}`});
    await onSubmit(newJob)
    setState({status: `submitted... ${JSON.stringify(newJob)}`});

  }

  return (
    <Form onSubmit={handleSubmit}>
      <Heading slot="title">Create Job</Heading>
      <TextField autoFocus isRequired name="company">
        <Label>Company</Label>
        <Input />
        <FieldError />
      </TextField>
      <TextField isRequired name="role">
        <Label>Role</Label>
        <Input />
        <FieldError />
      </TextField>
      <TextField name="url">
        <Label>URL</Label>
        <Input />
        <FieldError />
      </TextField>
      <TextField name="notes">
        <Label>Notes</Label>
        <Input />
        <FieldError />
      </TextField>
      <div className="flex gap-8">
        <Button type="submit">Create</Button>
        <Button type="reset">Reset</Button>
      </div>
      { state.status && <div>Status: <code>{state.status}</code></div>}
    </Form>
  )
}