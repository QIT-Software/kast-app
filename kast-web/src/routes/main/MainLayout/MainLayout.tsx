import React, {ReactElement} from 'react';
import MenuAppBar from './MenuAppBar/MenuAppBar';

interface MainLayoutProps {
  subTitle?: string;
  bottomElements?: () => ReactElement;
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
  return (
    <div
      style={{
        height: '91vh',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '2%',
        paddingBottom: '2%',
      }}
    >
      <MenuAppBar />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '2%',
          paddingBottom: '2%',
          background: '#FDFCFE',
        }}
      >
        <div
          style={{
            background: '#FDFCFE',
            paddingLeft: '2%',
            paddingRight: '2%',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
