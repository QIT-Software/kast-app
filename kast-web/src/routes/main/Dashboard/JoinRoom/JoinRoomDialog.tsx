import React from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  IconButton,
  Box,
} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {Form, Formik, FormikHelpers, FormikProps} from 'formik';
import * as yup from 'yup';
import {useDashboardActions} from 'state/hooks/UseActions';
import {useStyles} from './JoinRoomDialog.styles';
import {useSelector} from 'state/hooks';
import {useLocation, useHistory} from 'react-router-dom';
import {parse, parseUrl} from 'query-string';
import {UserRole} from 'entities/Room';
import cross from '../assets/cross.svg';
import {useGuard} from 'state/hooks/UseGuard';

interface FormValues {
  inviteLink: string;
  password: string | undefined;
  enableMicrophone: boolean;
  enableCamera: boolean;
}

interface JoinRoomDialogProps extends DialogProps {}

const JoinRoomDialog: React.FC<JoinRoomDialogProps> = ({...anotherProps}) => {
  // useGuard({
  //   requireAuthenticated: true,
  //   requireRoomAuthenticated: true,
  //   joinRoomBoolean: true,
  // });
  useGuard({requireRoomCheck: true});

  const {t} = useTranslation('dashboard');
  const actions = useDashboardActions();
  const classes = useStyles();
  const location = useLocation();
  const state = useSelector((state) => state.dashboard);
  const {invite} = parse(location.search);
  const history = useHistory();

  const initialValues: FormValues = {
    inviteLink: (invite as string) || '',
    password: '',
    enableMicrophone: false,
    enableCamera: false,
  };

  const validationSchema = yup
    .object<FormValues>({
      inviteLink: yup.string().required(),
      password: yup.string(),
      enableMicrophone: yup.boolean().required(),
      enableCamera: yup.boolean().required(),
    })
    .defined();

  const submit = (values: FormValues, {setSubmitting}: FormikHelpers<FormValues>) => {
    setSubmitting(false);
    const {
      query: {invite},
    } = parseUrl(values.inviteLink);
    const inviteLink = (invite as string | undefined) || values.inviteLink;
    actions.joinRoom({
      inviteLink,
      password: values.password,
      enableMicrophone: values.enableMicrophone,
      enableCamera: values.enableCamera,
      userRole: UserRole.Participant,
    });
  };

  const submitting = state.joiningRoom;

  const renderForm = ({
    values,
    errors,
    setFieldValue,
    isValid,
  }: FormikProps<FormValues>) => {
    return (
      <Form>
        <FormGroup>
          <TextField
            autoFocus
            label={t('joinRoomDialog.field.inviteLink')}
            fullWidth
            value={values.inviteLink}
            onChange={(e) => setFieldValue('inviteLink', e.target.value)}
            error={!!errors.inviteLink}
            helperText={errors.inviteLink}
            variant="outlined"
            disabled={submitting}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            label={t('joinRoomDialog.field.password')}
            fullWidth
            type="password"
            autoComplete="new-password"
            value={values.password}
            onChange={(e) => setFieldValue('password', e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            disabled={submitting}
          />
        </FormGroup>
        <FormGroup row>
          <FormControlLabel
            label={t('dashboard:joinRoomDialog.switch.microphone.on')}
            control={
              <Switch
                checked={values.enableMicrophone}
                onChange={(_, checked) => setFieldValue('enableMicrophone', checked)}
                disabled={submitting}
              />
            }
          />
          <FormControlLabel
            label={t('dashboard:joinRoomDialog.switch.camera.on')}
            control={
              <Switch
                checked={values.enableCamera}
                onChange={(_, checked) => setFieldValue('enableCamera', checked)}
                disabled={submitting}
              />
            }
          />
        </FormGroup>
        <FormGroup>
          <div className={classes.wrapper}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!isValid || submitting}
            >
              {t('joinRoomDialog.button.start')}
            </Button>
            {submitting && (
              <CircularProgress className={classes.createButtonProgress} size={24} />
            )}
          </div>
        </FormGroup>
      </Form>
    );
  };

  return (
    <Dialog fullWidth {...anotherProps}>
      <Box style={{display: 'flex', justifyContent: 'space-between'}}>
        <DialogTitle>{t('joinRoomDialog.title')}</DialogTitle>
        <IconButton
          style={{width: 20, height: 20, padding: 25}}
          onClick={() => {
            history.push('/main');
          }}
        >
          <img src={cross} alt="" style={{width: 20, height: 20}} />
        </IconButton>
      </Box>

      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={submit}
          validationSchema={validationSchema}
        >
          {renderForm}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default JoinRoomDialog;
