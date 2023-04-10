import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface DialogProps {
  open: boolean;
  onClose(value: boolean): void;
  title: string;
  description?: string;
  confirmLabel?: string;
  rejectLabel?: string;
}

export default function AlertDialog({
  title,
  open,
  description,
  confirmLabel,
  rejectLabel,
  onClose,
}: DialogProps) {
  const handleReject = () => {
    onClose(false);
  };

  const handleAccept = () => {
    onClose(true);
  };

  return (
    <Dialog
      open={open}
      onClose={handleReject}
    >
      <DialogTitle>{title}</DialogTitle>

      {description && (
        <DialogContent>
          <DialogContentText>
            {description}
          </DialogContentText>
        </DialogContent>
      )}

      <DialogActions>
        <Button onClick={handleReject}>{rejectLabel || 'No'}</Button>
        <Button onClick={handleAccept} autoFocus>
          {confirmLabel || 'Yes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}