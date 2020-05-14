import React, { memo } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@material-ui/core';

import { NameSpaces as NS } from 'constants/i18n';
import { useTranslation } from 'react-i18next';

const ConfirmDialog = (props:any) => {
  const {
    title, children, open, setOpen, onConfirm,
  } = props;
  const { t } = useTranslation([NS.LOGIN]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="confirm-dialog">
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)} color="default">
          {t(`${NS.COMMON}:button.no`)}
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color="primary"
        >
          {t(`${NS.COMMON}:button.yes`)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(ConfirmDialog);
