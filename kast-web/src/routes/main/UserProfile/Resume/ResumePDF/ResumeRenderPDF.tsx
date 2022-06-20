import React from 'react';
// import {useStyles} from 'routes/main/User/Resume/ResumePattern/ResumePattern.style';
import {Box, Button} from '@material-ui/core';
import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import SimpleButton from 'components/Buttons/SimpleButton';
import {useHistory} from 'react-router-dom';

const ResumePattern = (
  summary: string,
  experience: string,
  education: string,
  awards: string,
) => {
  return (
    <Document>
      <Page size="A4">
        <View wrap={false}>
          <Text>summary</Text>
          <Text>{summary} </Text>
        </View>
        <View wrap={false}>
          <Text>experience</Text>
          <Text>{experience}</Text>
        </View>
        <View wrap={false}>
          <Text>education</Text>
          <Text>{education}</Text>
        </View>
        <View wrap={false}>
          <Text>awards</Text>
          <Text>{awards}</Text>
        </View>
      </Page>
    </Document>
  );
};

const PdfRender = () => {
  const history = useHistory();

  return (
    <Box style={{height: '100%', width: '70%'}}>
      <Box style={{height: '100%', width: '100%'}}>
        <PDFViewer style={{height: '100%', width: '100%'}}>
          {ResumePattern('1', '1', '1', '1')}
        </PDFViewer>
        <div>
          <PDFDownloadLink
            document={ResumePattern('1', '1', '1', '1')}
            fileName="somename.pdf"
          >
            <Button>do</Button>
          </PDFDownloadLink>
        </div>
      </Box>
      <Box>
        <SimpleButton
          title="fill the form"
          action={() => {
            history.push('/userprofile/resume/resume-dialog');
          }}
        />
        <SimpleButton
          title="add pdf resume"
          action={() => {
            history.push('/userprofile/resume/download');
          }}
        />
      </Box>
    </Box>
  );
};
export default PdfRender;

export const PdfRenderDownload = () => (
  <div>
    <PDFDownloadLink document={ResumePattern('1', '1', '1', '1')} fileName="somename.pdf">
      {({loading}) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink>
  </div>
);
