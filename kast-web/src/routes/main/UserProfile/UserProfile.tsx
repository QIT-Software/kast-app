import React, {useEffect} from 'react';
import UserProfileLayout from 'routes/main/UserProfile/UserProfileLayout/UserProfileLayout';
// import {useStyles} from 'routes/main/User/UserLayout.style';
// import {Typography, Box, List, ListItem} from '@material-ui/core';
import {Route} from 'react-router-dom';
import MyInfo from 'routes/main/UserProfile/MyInfo/MyInfo';
import Impact from 'routes/main/UserProfile/Impact/Impact';
import Resume from 'routes/main/UserProfile/Resume/Resume';
import Gallery from 'routes/main/UserProfile/Gallery/Gallery';
import Referral from 'routes/main/UserProfile/Referral/Referral';
import PdfRender from 'routes/main/UserProfile/Resume/ResumePDF/ResumePDF';
import {useReferrersActions} from 'state/hooks/UseActions';

const UserProfile: React.FC = () => {
  const actions = useReferrersActions();

  useEffect(() => {
    actions.fetchReferrers();
  }, []);

  return (
    <UserProfileLayout>
      <Route path="/userprofile/my-info" component={MyInfo} />
      <Route path="/userprofile/impact" component={Impact} />
      <Route path="/userprofile/resume" component={Resume} />
      <Route path="/userprofile/pdf" component={PdfRender} />
      <Route path="/userprofile/gallery" component={Gallery} />
      <Route path="/userprofile/referral" component={Referral} />
    </UserProfileLayout>
  );
};

export default UserProfile;
