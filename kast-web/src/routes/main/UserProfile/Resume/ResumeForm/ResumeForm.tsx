import React, {useEffect} from 'react';
import {
  Dialog,
  DialogProps,
  DialogContent,
  DialogTitle,
  FormGroup,
  Typography,
  Button,
} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {useResumeActions} from 'state/hooks/UseActions';
import {Form, Formik, FormikProps, FormikHelpers} from 'formik';
import {useStyles} from 'routes/main/UserProfile/Resume/ResumeForm/ResumeForm.style';
import {useSelector} from 'state/hooks';
import {useTranslation} from 'react-i18next';

interface FormValues {
  summary: string;
  experience: string;
  education: string;
  awards: string;
}

interface ResumeDialogProps extends DialogProps {}

const ResumeDialog: React.FC<ResumeDialogProps> = ({...anotherProps}) => {
  const resumeActions = useResumeActions();
  const userResume = useSelector((state) => state.resume);
  useEffect(() => {
    resumeActions.fetchResume();
    resumeActions.fetchResumeLink();
  }, []);
  const history = useHistory();
  const {t} = useTranslation('resume');
  const classes = useStyles();

  const initialValues: FormValues = {
    summary: userResume.resume?.summary || '',
    experience: userResume.resume?.experience || '',
    education: userResume.resume?.education || '',
    awards: userResume.resume?.awards || '',
  };

  const submit = (values: FormValues, {setSubmitting}: FormikHelpers<FormValues>) => {
    setSubmitting(false);
    resumeActions.saveResume({
      summary: values.summary,
      experience: values.experience,
      education: values.education,
      awards: values.awards,
    });
    history.push(`/userprofile/pdf`);
  };

  const renderForm = ({values, setFieldValue}: FormikProps<FormValues>) => {
    return (
      <Form>
        <FormGroup>
          <Typography variant="h6">{t('summary')}</Typography>
          <textarea
            className={classes.field}
            style={{height: 350}}
            required
            id="summary"
            value={values.summary}
            onChange={(e) => setFieldValue('summary', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Typography variant="h6">{t('experience')}</Typography>
          <textarea
            className={classes.field}
            style={{height: 350}}
            required
            id="experience"
            value={values.experience}
            onChange={(e) => setFieldValue('experience', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Typography variant="h6">{t('education')}</Typography>

          <textarea
            className={classes.field}
            style={{height: 350}}
            required
            id="education"
            value={values.education}
            onChange={(e) => setFieldValue('education', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Typography variant="h6">{t('awards')}</Typography>
          <textarea
            className={classes.field}
            style={{height: 350}}
            required
            id="awards"
            value={values.awards}
            onChange={(e) => setFieldValue('awards', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button
            type="submit"
            variant="contained"
            style={{width: '75%', margin: 'auto'}}
          >
            {t('submit')}
          </Button>
        </FormGroup>
      </Form>
    );
  };

  return (
    <Dialog fullWidth {...anotherProps} maxWidth="lg">
      <DialogTitle>ResumeDialogProps</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={submit}
          enableReinitialize={!!userResume.resume}
        >
          {renderForm}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeDialog;
