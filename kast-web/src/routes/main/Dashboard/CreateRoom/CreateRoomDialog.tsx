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
  Box,
  IconButton,
} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {Form, Formik, FormikHelpers, FormikProps} from 'formik';
import * as yup from 'yup';
import {useDashboardActions} from 'state/hooks/UseActions';
import {useStyles} from './CreateRoomDialog.styles';
import {useSelector} from 'state/hooks';
import {RoomType, UserRole} from 'entities/Room';
import cross from 'routes/main/Dashboard/assets/cross.svg';
import {useHistory} from 'react-router-dom';
import {useGuard} from 'state/hooks/UseGuard';

interface FormValues {
  title: string;
  passwordProtected: boolean;
  password: string | undefined;
  enableMicrophone: boolean;
  enableCamera: boolean;
}

interface CreateRoomDialogProps extends DialogProps {
  title: string;
  roomType: RoomType;
}

const CreateRoomDialog: React.FC<CreateRoomDialogProps> = ({
  title,
  roomType,
  ...anotherProps
}) => {
  // useGuard({
  //   requireAuthenticated: true,
  //   requireRoomAuthenticated: true,
  //   createRoomBoolean: true,
  //   roomType,
  // });
  const {t} = useTranslation('dashboard');
  const actions = useDashboardActions();
  const classes = useStyles();
  const state = useSelector((state) => state.dashboard);
  const history = useHistory();
  useGuard({requireRoomCheck: true});

  const initialValues: FormValues = {
    title: '',
    passwordProtected: false,
    password: '',
    enableMicrophone: false,
    enableCamera: false,
  };

  const validationSchema = yup
    .object<FormValues>({
      title: yup.string().required(),
      passwordProtected: yup.boolean().required(),
      password: yup.string().when('passwordProtected', {
        is: true,
        then: yup.string().required().min(8),
      }),
      enableMicrophone: yup.boolean().required(),
      enableCamera: yup.boolean().required(),
    })
    .defined();

  const submitting = state.creatingRoom;

  const submit = (values: FormValues, {setSubmitting}: FormikHelpers<FormValues>) => {
    setSubmitting(false);
    actions.createRoom({
      title: values.title,
      passwordProtected: values.passwordProtected,
      password: values.password,
      enableMicrophone: values.enableMicrophone,
      enableCamera: values.enableCamera,
      type: roomType,
      userRole: UserRole.Owner,
    });
  };

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
            label={t('createRoomDialog.field.title')}
            placeholder={t('createRoomDialog.field.title.placeholder')}
            fullWidth
            value={values.title}
            onChange={(e) => setFieldValue('title', e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            variant="outlined"
            InputLabelProps={{shrink: true}}
            disabled={submitting}
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            label={t('dashboard:createRoomDialog.switch.passwordProtected')}
            control={
              <Switch
                checked={values.passwordProtected}
                onChange={(_, checked) => setFieldValue('passwordProtected', checked)}
                disabled={submitting}
              />
            }
          />
          {values.passwordProtected && (
            <TextField
              label={t('createRoomDialog.field.password')}
              fullWidth
              type="password"
              autoComplete="new-password"
              value={values.password}
              onChange={(e) => setFieldValue('password', e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              disabled={submitting}
            />
          )}
        </FormGroup>
        <FormGroup row>
          <FormControlLabel
            label={t('dashboard:createRoomDialog.switch.microphone.on')}
            control={
              <Switch
                checked={values.enableMicrophone}
                onChange={(_, checked) => setFieldValue('enableMicrophone', checked)}
                disabled={submitting}
              />
            }
          />
          <FormControlLabel
            label={t('dashboard:createRoomDialog.switch.camera.on')}
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
              {t('createRoomDialog.button.start')}
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
        <DialogTitle>{title}</DialogTitle>
        <IconButton
          style={{width: 30, height: 30, padding: 25}}
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

export default CreateRoomDialog;
