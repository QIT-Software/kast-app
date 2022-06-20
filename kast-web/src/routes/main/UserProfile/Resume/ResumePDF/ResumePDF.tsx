import React, {useEffect, useState} from 'react';
import {Box, Button, Typography, CardMedia} from '@material-ui/core';
import SimpleButton from 'components/Buttons/SimpleButton';
import {useHistory} from 'react-router-dom';
import {Document, Page, pdfjs} from 'react-pdf';
import {useResumeActions, useUserProfileActions} from 'state/hooks/UseActions';
import {useSelector} from '../../../../../state/hooks';
import userProfileLogo from 'routes/main/UserProfile/assets/userProfileLogo.svg';
import {useStyles} from 'routes/main/UserProfile/Resume/ResumePDF/ResumePDFStyles';
import {RequireLoadable} from 'components';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfRender = () => {
  const history = useHistory();
  const actions = useResumeActions();
  const profileActions = useUserProfileActions();

  const state = useSelector((state) => state.userProfile);
  useEffect(() => {
    // actions.fetchResumeLink();
    profileActions.fetchUserProfile();
  }, []);
  const [pdf, setPdf] = useState<File | undefined>(undefined);
  const [pdfName, setPdfName] = useState<string | undefined>(undefined);

  const uploadPdf = () => {
    if (pdf && pdfName) {
      actions.uploadPdf(pdfName, pdf);
    }
  };

  const classes = useStyles();

  return (
    <RequireLoadable data={state}>
      {(state) => {
        return (
          <Box
            // style={{height: '100%', width: '70%'}}
            className={classes.root}
          >
            <Box>
              <Box
                className={classes.content}
                // style={{marginLeft: '100px', width: 'fitContent'}}
              >
                <div
                  style={{
                    width: 'fit-content',
                    margin: 'auto',
                    border: 'solid 2px #C82FC6',
                    borderRadius: 5,
                  }}
                >
                  <Document
                    file={{
                      url: state.resumeUrl,
                    }}
                    renderMode="svg"
                  >
                    <Page pageNumber={1} height={600} />
                  </Document>
                </div>
              </Box>
              <Button
                href={state.resumeUrl}
                style={{
                  marginTop: 50,
                  width: 400,
                  borderRadius: 15,
                  backgroundColor: '#C82FC6',
                  color: '#fff',
                }}
              >
                <Typography variant="h6"> download</Typography>
              </Button>
            </Box>
            <Box className={classes.mediaContainer}>
              <CardMedia
                className={classes.media}
                image={userProfileLogo}
                title="Contemplative Reptile"
              />
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
                    marginBottom: 50,
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
        );
      }}
    </RequireLoadable>
  );
};
export default PdfRender;
