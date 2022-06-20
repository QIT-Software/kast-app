import React, {useState} from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormGroup,
  TextField,
} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {Form, Formik, FormikHelpers} from 'formik';
import {useStyles} from 'routes/main/Files/AddDirectoryDialog/AddDirectoryDialog.styles';
import {useFilesActions} from 'state/hooks/UseActions';
import {useHistory, useLocation} from 'react-router-dom';
import {parse} from 'query-string';

interface FormValues {
  directoryName: string;
  directory: [];
}

interface AddDirectoryDialogProps extends DialogProps {}
const AddDirectoryDialog: React.FC<AddDirectoryDialogProps> = ({...anotherProps}) => {
  const {t} = useTranslation('files');
  const [directoryName, setDirectoryName] = useState<string>();
  const classes = useStyles();
  const loaded = false;
  const actions = useFilesActions();
  const history = useHistory();
  const location = useLocation();
  const {parent} = parse(location.search);

  const initialValues: FormValues = {
    directoryName: '',
    directory: [],
  };

  const renderForm = () => {
    return (
      <Form>
        <FormGroup>
          <TextField
            autoFocus
            label={t('AddDirectoryName')}
            placeholder={t('setDirectoryName')}
            fullWidth
            value={directoryName}
            inputProps={{
              maxLength: 20,
            }}
            onChange={(e) => {
              e.preventDefault();
              setDirectoryName(e.target.value);
            }}
            variant="outlined"
            InputLabelProps={{shrink: true}}
          />
        </FormGroup>
        <FormGroup>
          <div className={classes.wrapper}>
            <Button
              type="submit"
              variant="contained"
              fullWidth // TODO return disabled
            >
              {t('add Directory')}
            </Button>
            {loaded && (
              <CircularProgress className={classes.createButtonProgress} size={24} />
            )}
          </div>
        </FormGroup>
      </Form>
    );
  };
  const submit = (values: FormValues, {setSubmitting}: FormikHelpers<FormValues>) => {
    setSubmitting(false);
    if (directoryName) {
      actions.createDirectory(directoryName, parent as string | undefined);
      history.goBack();
    }
  };

  return (
    <Dialog fullWidth {...anotherProps}>
      <DialogTitle>{t('addDirectory')}</DialogTitle>
      <DialogContent>
        <Formik initialValues={initialValues} onSubmit={submit}>
          {renderForm}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddDirectoryDialog;
