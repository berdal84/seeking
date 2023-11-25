"use client"
import {useCallback, useState} from "react";
import {schemas} from "@/app/typings/schemas";
import {TextField} from "@mui/material";
import {Button} from "@mui/base";
import {useFormik} from "formik";
import * as yup from 'yup'

export type Props = {
  onSubmit: (data: schemas.JobCreate) => Promise<void>
}

type State = {
  status: string | null
}

export default function JobForm({ onSubmit }: Props) {

  const [state, setState] = useState<State>({
    status: null
  })

  const {
    handleSubmit,
    values,
    handleChange,
    errors,
    handleReset,
    handleBlur,
    touched,
    submitForm,
  } = useFormik<schemas.JobCreate>({
    initialValues: {
      notes: "",
      url: "",
      role: "",
      company: ""
    },
    onReset: () => {},
    validateOnMount: false,
    onSubmit: async (data: schemas.JobCreate) => {
      setState({status: `submitting... ${JSON.stringify(data)}`});
      await onSubmit(data)
      setState({status: `submitted... ${JSON.stringify(data)}`});
    },
    validationSchema: yup.object().shape({
      role: yup.string().trim().min(3).required().nonNullable(),
      company: yup.string().trim().min(3).required().nonNullable(),
      url: yup.string().trim().url().optional(),
      notes: yup.string().trim().min(3).optional()
    })
  })

  const hasError = useCallback( (key: keyof schemas.JobCreate): boolean => {
    return touched[key] == true && key in errors;
  }, [errors, touched])


  const getError = useCallback( (key: keyof schemas.JobCreate): string | undefined => {
    return touched[key] == true ? errors[key] : undefined;
  }, [errors, touched])

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} onChange={handleChange}>
      <TextField
        id="role"
        label="Role"
        margin="normal"
        variant="outlined"
        placeholder="Enter a role"
        helperText={getError("role")}
        error={hasError("role")}
        required
        focused={true}
        value={values.role}
        onBlur={handleBlur}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        id="company"
        label="Company"
        margin="normal"
        placeholder="Enter a company name"
        helperText={getError("company")}
        variant="outlined"
        required
        value={values.company}
        onBlur={handleBlur}
        onChange={handleChange}
        error={hasError("company")}
        fullWidth
      />

      <TextField
        id="url"
        label="URL"
        margin="normal"
        placeholder="Enter an URL"
        helperText={getError("url")}
        error={hasError("url")}
        variant="outlined"
        value={values.url}
        onBlur={handleBlur}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        id="notes"
        label="Notes"
        margin="normal"
        placeholder="Enter a notes name"
        helperText={getError("notes")}
        error={hasError("notes")}
        variant="outlined"
        value={values.notes}
        onBlur={handleBlur}
        onChange={handleChange}
        fullWidth
      />

      <Button variant="outlined" onClick={handleReset}>Reset</Button>
      <Button variant="outlined" onClick={submitForm}>Create</Button>

      {/*JSON.stringify(touched)*/}
      {/*JSON.stringify(errors)*/}
    </form>

  )
}