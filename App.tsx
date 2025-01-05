import React, { useState } from 'react';
import SplashScreen from './pages/SplashScreen';
import StartingPage from './pages/StartingPage';
import StartingPage2 from './pages/StartingPage2';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DriverReg1 from './pages/JeepNi_DriverReg1';
import HomePage from './pages/Homepage';
import MapPage from './pages/MapPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationPage';
import BottomNavBar from './pages/BottomNavbar';
import AdminBottomNavBar from './pages/Admin/AdminBottomNavbar';
import AdminHomePage from './pages/Admin/AdminHomePage';
import AdminMapPage from './pages/Admin/MapPage';
import AdminNotificationPage from './pages/Admin/NotificationPage';
import AdminProfilePage from './pages/Admin/ProfilePage';
import DriverReg2 from './pages/JeepNi_DriverReg2';
import DriverReg3 from './pages/JeepNi_DriverReg3';
import RoutePage from './pages/Admin/RoutesPage';
import DriverMainPage from './pages/DriverMainPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('SplashScreen');
  const [username, setUsername] = useState('');
   const [driverData, setDriverData] = useState({
    firstname: '',
    lastname: '',
    mobileNumber: '',
    homeAddress: '',
    emailAddress: '',
    licensePlateNo: '',
    codeNo: '',
    licenseNo: '',
    licensePhoto: null,
    registrationPhoto: null,
  });

  const pages = {
    SplashScreen: <SplashScreen onFinish={() => setCurrentPage('StartingPage')} />,
    StartingPage: (
      <StartingPage
        onRegister={() => setCurrentPage('RegisterPage')}
        onDriver={() => setCurrentPage('StartingPage2')}
      />
    ),
    RegisterPage: (
      <RegisterPage
        onBack={() => setCurrentPage('StartingPage')}
        onLogin={() => setCurrentPage('LoginPage')}
        onHomePage={() => setCurrentPage('HomePage')}
      />
    ),
    LoginPage: (
      <LoginPage
        onBack={() => setCurrentPage('StartingPage')}
        onRegister={() => setCurrentPage('RegisterPage')}
        onHomePage={(username) => {
          setUsername(username);
          setCurrentPage('HomePage');
        }}
        onAdminPage={(username) => {
          setUsername(username);
          setCurrentPage('AdminHomePage');
        }}
      />
    ),
DriverReg1: (
  <DriverReg1
    onDriver={() => setCurrentPage('StartingPage2')}
    onDriverDocuments={() => setCurrentPage('DriverMainPage')} // Redirect after registration
    driverData={driverData}
    setDriverData={setDriverData}
  />
),

    DriverReg2: (
      <DriverReg2
      	onDriverReg1={() => setCurrentPage('DriverReg1')}
      	onDriverReg3={() => setCurrentPage('DriverReg3')}
	driverData={driverData}
	setDriverData={setDriverData}
      />
    ),
    DriverReg3: (
      <DriverReg3
      onDriverReg2={() => setCurrentPage('DriverReg2')}
        driverData={driverData}

      />
    ),
    StartingPage2: (
      <StartingPage2
        onStartPage1={() => setCurrentPage('StartingPage')}
        onRegDriver={() => setCurrentPage('DriverReg1')}
      />
    ),
    HomePage: (
      <HomePage onNavigate={setCurrentPage}/>
    ),
    MapPage: <MapPage />,
    ProfilePage: (
      <ProfilePage
        onBack={() => setCurrentPage('StartingPage')}
      />
    ),
    NotificationsPage: <NotificationsPage />,
    AdminHomePage: (
      <AdminHomePage 
      onNavigate={setCurrentPage}
      onRoutePage={() => setCurrentPage('RoutePage')}
      username={username}
      />
    ),
    AdminMapPage: <AdminMapPage/>,
    AdminProfilePage: (
      <AdminProfilePage
        onBack={() => setCurrentPage('LoginPage')}
      />
    ),
    AdminNotificationPage: (
      <AdminNotificationPage/>
    ),
    RoutePage: (
    <RoutePage onBack={() => setCurrentPage('AdminHomePage')} />
    ),
     DriverMainPage: <DriverMainPage />,
  };

  const showBottomNavBar = ['HomePage', 'MapPage', 'ProfilePage', 'NotificationsPage'].includes(currentPage);
  const AdminshowBottomNavBar = ['AdminHomePage', 'AdminMapPage', 'AdminProfilePage', 'AdminNotificationPage'].includes(currentPage);

  return (
    <>
      {pages[currentPage] || pages.SplashScreen}

      {showBottomNavBar && <BottomNavBar onNavigate={setCurrentPage} />}
      {AdminshowBottomNavBar && <AdminBottomNavBar onNavigate={setCurrentPage} />}
    </>
  );
};

export default App;
