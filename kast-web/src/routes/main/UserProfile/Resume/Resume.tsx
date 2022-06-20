import {useStyles} from './Resume.style';
import {useHistory, Route} from 'react-router-dom';
import {useResumeActions} from '../../../../state/hooks/UseActions';
import ResumeDialog from 'routes/main/UserProfile/Resume/ResumeForm/ResumeForm';
import {Button, Typography, Box, CardMedia} from '@material-ui/core';
import React, {useState} from 'react';
import SimpleButton from 'components/Buttons/SimpleButton';
// import ResumeDialog from 'routes/main/User/Resume/ResumePattern/ResumePattern';
import userProfileLogo from '../assets/userProfileLogo.svg';

const Resume = () => {
  const classes = useStyles();
  const [pdf, setPdf] = useState<File | undefined>(undefined);
  const [pdfName, setPdfName] = useState<string | undefined>(undefined);
  // const user = useSelector((state) => state.userProfile);
  const actions = useResumeActions();
  const history = useHistory();

  const uploadPdf = () => {
    if (pdf && pdfName) {
      actions.uploadPdf(pdfName, pdf);
    }
  };

  return (
    <>
      {/* <RequireLoadable data={user}> */}
      {/*  {(user) => { */}
      {/*    return ( */}
      {/*      <> */}
      <Box className={classes.root}>
        <Box className={classes.mediaContainer}>
          <CardMedia
            className={classes.media}
            image={userProfileLogo}
            title="Contemplative Reptile"
          />
        </Box>
        <Box className={classes.textContainer}>
          <Typography align="center" variant="h6" className={classes.text}>
            Create a resume to find a good job quickly and efficiently. We will help you
            create a professional resume that meets all modern requirements. It will be
            convenient for you to respond with such a resume to vacancies, and employers -
            to receive it in the form they are used to. Even those employers who do not
            post jobs will be able to find your resume and offer you a job, or download a
            PDF of your finished resume.
          </Typography>
        </Box>
        <Box className={classes.buttonsContainer}>
          <label htmlFor="upload-photo">
            <input
              accept="application/pdf"
              style={{display: 'none'}}
              id="upload-photo"
              name="upload-photo"
              type="file"
              onSubmit={() => {
                uploadPdf();
              }}
              onChange={(event) => {
                // @ts-ignore
                setPdf(event.target.files[0]);
                // @ts-ignore
                setPdfName(event.target.files[0].name);
                if (event.target.files) {
                  actions.uploadPdf('user.name', event.target.files[0]);
                }
                actions.fetchResumeLink();
              }}
            />
            <Button
              component="span"
              style={{
                width: 400,
                borderRadius: 15,
                fontSize: '1.25rem',
                backgroundColor: '#C82FC6',
                color: '#fff',
                marginRight: 15,
              }}
            >
              <Typography align="center" variant="h6">
                add pdf resume
              </Typography>
            </Button>
            <SimpleButton
              title="fill the form"
              action={() => history.push(`/userprofile/resume/resume-dialog`)}
            />
          </label>
        </Box>
      </Box>
      <Route path="/userprofile/resume/resume-dialog">
        <ResumeDialog open onClose={() => history.goBack()} />
      </Route>
    </>
    //     );
    //   }}
    // </RequireLoadable>
    // </>
  );
};

export default Resume;
