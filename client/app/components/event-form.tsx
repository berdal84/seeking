"use client"
import {useCallback, useState} from "react";
import {schemas} from "@/app/typings/schemas";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useFormik} from "formik";
import * as yup from 'yup'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from "dayjs";
import {DateField} from "@mui/x-date-pickers";

export type Props = {
  onSubmit: (data: schemas.EventCreate) => Promise<void>
}

type State = {
  status: string | null
}

export default function EventForm({ onSubmit }: Props) {

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
    setFieldValue,
  } = useFormik<schemas.EventCreate>({
    initialValues: {
      type: "APPLICATION_SENT",
      date: Date().toString(),
      notes: "",
    },
    onReset: () => {},
    validateOnMount: false,
    onSubmit: async (data) => {
      setState({status: `submitting... ${JSON.stringify(data)}`});
      await onSubmit({
        type: data.type,
        notes: data.notes,
        date: data.date
      })
      setState({status: `submitted... ${JSON.stringify(data)}`});
    },
    validationSchema: yup.object().shape({
      type: yup.string().trim().min(3).required().nonNullable(),
      notes: yup.string().trim().min(3).optional()
    })
  })

  const hasError = useCallback( (key: keyof schemas.EventCreate): boolean => {
    return touched[key] == true && key in errors;
  }, [errors, touched])


  const getError = useCallback( (key: keyof schemas.EventCreate): string | undefined => {
    return touched[key] == true ? errors[key] : undefined;
  }, [errors, touched])

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} onChange={handleChange}>
      <TextField
        id="type"
        label="Type"
        margin="normal"
        variant="outlined"
        placeholder="Enter a role"
        helperText={getError("type")}
        error={hasError("type")}
        required
        focused={true}
        value={values.type}
        onBlur={handleBlur}
        onChange={handleChange}
        fullWidth
      />

      <DesktopDatePicker
        label="Date"
        value={dayjs(values.date)}
        onChange={date => setFieldValue("date", date?.toISOString() ?? "")}
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

      <Box>
        <Button variant="outlined" onClick={handleReset}>Reset</Button>
        <Button variant="outlined" onClick={submitForm}>Create</Button>
      </Box>
      {/*JSON.stringify(touched)*/}
      {/*JSON.stringify(errors)*/}
    </form>

  )
}