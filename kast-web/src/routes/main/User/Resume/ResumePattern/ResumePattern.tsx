import React, {useState} from 'react';
import {useStyles} from './ResumePattern.style';
import {
  Box,
  Typography,
  Dialog,
  DialogProps,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import SimpleButton from 'components/Buttons/SimpleButton';
// import {useUserProfileActions} from 'state/hooks/UseActions';

// const ResumePattern = () => {
//   const classes = useStyles();
//   const userActions = useUserProfileActions();
//
//   const [field1, setField1] = useState('');
//   const [field2, setField2] = useState('');
//   const [field3, setField3] = useState('');
//   const [field4, setField4] = useState('');
//   const history = useHistory();
//
//   useEffect(() => {
//     userActions.fetchUserProfile();
//   }, []);
//
//   return (
//     <Box className={classes.root}>
//       <Box className={classes.fieldContainer}>
//         <Typography className={classes.label} align="left" variant="h5" color="secondary">
//           Mission
//         </Typography>
//         <textarea
//           className={classes.field}
//           style={{height: 500}}
//           required
//           id="country"
//           value={field1}
//           onChange={(e) => setField1(e.target.value)}
//         />
//       </Box>
//       <Box className={classes.fieldContainer}>
//         <Typography className={classes.label} align="left" variant="h5" color="secondary">
//           Vision
//         </Typography>
//         <textarea
//           className={classes.field}
//           style={{height: 200}}
//           required
//           id="country"
//           value={field2}
//           onChange={(e) => setField2(e.target.value)}
//         />
//       </Box>
//
//       <Box>
//         <Typography className={classes.label} align="left" variant="h5" color="secondary">
//           Interest
//         </Typography>
//         <textarea
//           className={classes.field}
//           style={{height: 100, color: '#C82FC6'}}
//           required
//           id="country"
//           value={field3}
//           onChange={(e) => setField3(e.target.value)}
//         />
//       </Box>
//
//       <Box>
//         <Typography className={classes.label} align="left" variant="h5" color="secondary">
//           Skils
//         </Typography>
//         <textarea
//           className={classes.field}
//           style={{height: 100, color: '#C82FC6'}}
//           required
//           id="country"
//           value={field4}
//           onChange={(e) => setField4(e.target.value)}
//         />
//       </Box>
//       <SimpleButton title="render pdf" action={() => history.push(`/userprofile/pdf`)} />
//     </Box>
//   );
// };

interface ResumeDialogProps extends DialogProps {}

const ResumeDialog: React.FC<ResumeDialogProps> = ({...anotherProps}) => {
  // const [openForm, setOpenForm] = useState<boolean>(false);

  const history = useHistory();
  // const userActions = useUserProfileActions();

  const classes = useStyles();

  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [field4, setField4] = useState('');

  return (
    <Dialog fullWidth {...anotherProps} maxWidth="lg">
      <DialogTitle>ResumeDialogProps</DialogTitle>
      <DialogContent>
        <Box style={{height: '75%'}}>
          <Box className={classes.fieldContainer}>
            <Typography
              className={classes.label}
              align="left"
              variant="h5"
              color="secondary"
            >
              Mission
            </Typography>
            <textarea
              className={classes.field}
              style={{height: 500}}
              required
              id="country"
              value={field1}
              onChange={(e) => setField1(e.target.value)}
            />
          </Box>
          <Box className={classes.fieldContainer}>
            <Typography
              className={classes.label}
              align="left"
              variant="h5"
              color="secondary"
            >
              Vision
            </Typography>
            <textarea
              className={classes.field}
              style={{height: 200}}
              required
              id="country"
              value={field2}
              onChange={(e) => setField2(e.target.value)}
            />
          </Box>

          <Box>
            <Typography
              className={classes.label}
              align="left"
              variant="h5"
              color="secondary"
            >
              Interest
            </Typography>
            <textarea
              className={classes.field}
              style={{height: 100, color: '#C82FC6'}}
              required
              id="country"
              value={field3}
              onChange={(e) => setField3(e.target.value)}
            />
          </Box>

          <Box>
            <Typography
              className={classes.label}
              align="left"
              variant="h5"
              color="secondary"
            >
              Skils
            </Typography>
            <textarea
              className={classes.field}
              style={{height: 100, color: '#C82FC6'}}
              required
              id="country"
              value={field4}
              onChange={(e) => setField4(e.target.value)}
            />
          </Box>
          <Box className={classes.buttonContainer}>
            <SimpleButton
              title="Save"
              action={() => {
                // userActions.saveResume({
                //   summary: field1,
                //   experience: field2,
                //   education: field3,
                //   awards: field4,
                // });
                history.push(`/userprofile/pdf`);
              }}
            />
            <SimpleButton
              title="Download PDF"
              action={() => history.push(`/userprofile/pdf`)}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeDialog;
