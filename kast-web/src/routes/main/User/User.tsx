import React, {useEffect} from 'react';
import UserLayout from './UserLayout/UserLayout';
import {Route, useParams} from 'react-router-dom';
import MyInfo from 'routes/main/User/MyInfo/MyInfo';
import Impact from 'routes/main/User/Impact/Impact';
import Resume from 'routes/main/User/Resume/Resume';
import Gallery from 'routes/main/User/Gallery/Gallery';
import PdfRender, {
  PdfRenderDownload,
} from 'routes/main/UserProfile/Resume/ResumePDF/ResumeRenderPDF';
import {useUserActions} from 'state/hooks/UseActions';

const User: React.FC = () => {
  const actions = useUserActions();

  const {userId} = useParams<{userId: string}>();

  useEffect(() => {
    actions.fetchUser(userId);
  }, []);

  return (
    <UserLayout>
      <Route path="/user/my-info" component={MyInfo} />
      <Route path="/user/impact" component={Impact} />
      <Route path="/user/resume" component={Resume} />
      <Route path="/user/pdf" component={PdfRender} />
      <Route path="/user/download-pdf" component={PdfRenderDownload} />
      <Route path="/user/gallery" component={Gallery} />
    </UserLayout>
  );
};

export default User;
