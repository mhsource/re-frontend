import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, DialogContentText } from '@mui/material';

export interface SimpleDialogProps {
  open: boolean;
  data: any;
  onClose: () => void;
}

export default function AlertDialog(props: SimpleDialogProps) {
  const { onClose, data, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {data}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
    </Dialog>
  );
}