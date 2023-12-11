import {schemas} from "@/app/typings/schemas";
import JobForm from "@/app/components/job-form";
import {SeekingAPI} from "@/app/utilities/seeking-api";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Dialog from "@mui/material/Dialog";
import EventForm from "./event-form";
import {formatJobName} from "@/app/utilities/formatting";

export interface CreateEventProps {
  open: boolean;
  job: schemas.Job;
  onClose: (data: schemas.Event | null) => Promise<void>
}

export default function CreateEventDialog(props: CreateEventProps) {
  const { onClose, open, job } = props;

  async function handleClose() {
    await onClose(null);
  }

  async function handleSubmit(formData: schemas.EventCreate) {
    // TODO: use Redux
    const newEvent = await SeekingAPI.event.create(job.id, formData)
    await onClose(newEvent)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Create Event
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
          To add a new event to the job <i>{formatJobName(job)}</i>, fill the form below and click send.
        </DialogContentText>
        <EventForm onSubmit={handleSubmit}/>
      </DialogContent>
    </Dialog>
  );
}
