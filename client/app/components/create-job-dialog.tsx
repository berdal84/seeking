import {schemas} from "@/app/typings/schemas";
import JobForm from "@/app/components/job-form";
import {SeekingAPI} from "@/app/utilities/seeking-api";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Dialog from "@mui/material/Dialog";

export interface CreateJobProps {
  open: boolean;
  onClose: (data: schemas.JobCreate | null) => Promise<void>
}

export default function CreateJobDialog(props: CreateJobProps) {
  const { onClose, open } = props;

  async function handleClose() {
    await onClose(null);
  }

  async function handleSubmit(formData: schemas.JobCreate) {
    const newJob = await SeekingAPI.createJob(formData)
    await onClose(newJob)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
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
    </Dialog>
  );
}
