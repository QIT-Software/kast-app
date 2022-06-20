export type SnackBarType = 'error' | 'success' | 'warning' | 'info';

export interface SnackBar {
  snackbarOpen: boolean;
  snackbarMessage?: any;
  snackBarType: SnackBarType;
}
