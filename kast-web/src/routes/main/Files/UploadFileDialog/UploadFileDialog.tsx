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
import {useStyles} from 'routes/main/Files/UploadFileDialog/UploadFileDialog.styles';
import {DropzoneArea} from 'material-ui-dropzone';
import {useFilesActions} from 'state/hooks/UseActions';
import {useHistory, useLocation} from 'react-router-dom';
import {parse} from 'query-string';

interface FormValues {
  fileName: string;
  file: File | undefined;
}

interface UploadFileDialogProps extends DialogProps {}
const UploadFileDialog: React.FC<UploadFileDialogProps> = ({...anotherProps}) => {
  const {t} = useTranslation('files');
  const [fileName, setFileName] = useState<string>();
  const [file, setFile] = useState<File>();
  const classes = useStyles();
  const loaded = false;
  const actions = useFilesActions();
  const history = useHistory();
  const location = useLocation();
  const {parent} = parse(location.search);

  const initialValues: FormValues = {
    fileName: ``,
    file: undefined,
  };

  const renderForm = () => {
    return (
      <Form>
        <FormGroup>
          <TextField
            autoFocus
            label={t('CreateFileName')}
            placeholder={t('seFIleName')}
            fullWidth
            value={fileName}
            inputProps={{
              maxLength: 20,
            }}
            onChange={(e) => {
              e.preventDefault();
              setFileName(e.target.value);
            }}
            variant="outlined"
            InputLabelProps={{shrink: true}}
          />
        </FormGroup>
        <FormGroup>
          <DropzoneArea
            filesLimit={1}
            getFileAddedMessage={(fileName: string) => {
              setFileName(fileName);
              return fileName;
            }}
            onChange={(files: File[]) => {
              setFile(files[0]);
            }}
          />
        </FormGroup>
        <FormGroup>
          <div className={classes.wrapper}>
            <Button
              type="submit"
              variant="contained"
              fullWidth // TODO return disabled
            >
              {t('upload')}
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
    if (fileName && file) {
      actions.uploadFile(fileName, file, parent as string | undefined);
      history.goBack();
    }
  };

  return (
    <Dialog fullWidth {...anotherProps}>
      <DialogTitle>{t('fileUpload')}</DialogTitle>
      <DialogContent>
        <Formik initialValues={initialValues} onSubmit={submit}>
          {renderForm}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default UploadFileDialog;
