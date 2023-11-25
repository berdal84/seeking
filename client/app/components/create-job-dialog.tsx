import {schemas} from "@/app/typings/schemas";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton} from "@mui/material";
import JobForm from "@/app/components/job-form";
import api from "@/app/utilities/api";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {Button} from "@mui/base";
import {styled} from "@mui/system";

export interface CreateJobProps {
  open: boolean;
  onClose: (data: schemas.JobCreate | null) => Promise<void>
}

const MyDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CreateJobDialog(props: CreateJobProps) {
  const { onClose, open } = props;

  async function handleClose() {
    await onClose(null);
  }

  async function handleSubmit(formData: schemas.JobCreate) {
    const newJob = await api.createJob(formData)
    await onClose(newJob)
  }

  return (
    <MyDialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Create Job
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <DialogContentText>
          To add a new job, fill the form below and click send.
        </DialogContentText>
        <JobForm onSubmit={handleSubmit}/>
      </DialogContent>
    </MyDialog>
  );
}
