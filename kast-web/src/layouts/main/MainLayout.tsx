import React from 'react';
import CustomSnackBar from 'components/SnackBar/SnackBar';

const MainLayout: React.FC = ({children}) => {
  return (
    <>
      <CustomSnackBar />
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
