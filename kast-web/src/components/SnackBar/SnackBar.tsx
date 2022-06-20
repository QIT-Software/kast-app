import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {useSelector} from '../../state/hooks';
import {useSnackBarActions} from '../../state/hooks/UseActions';
import {Alert} from '@material-ui/lab';

const CustomSnackBar = () => {
  const {closeSnackBar} = useSnackBarActions();

  const {snackbarOpen, snackbarMessage, snackBarType} = useSelector(
    (state) => state.snackBar,
  );

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={snackbarOpen}
      autoHideDuration={4000}
      onClose={closeSnackBar}
    >
      <Alert onClose={closeSnackBar} severity={snackBarType}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackBar;
