import React from 'react';
import { useUserDetails } from 'providers/UserDetailsProvider';

import './App.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'));

const App: React.StatelessComponent<{}> = () => {
  const user = useUserDetails();
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
