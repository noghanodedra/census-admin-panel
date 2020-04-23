import React from 'react';
import { useAuth } from 'providers/AuthProvider';

import './App.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'));

const App: React.StatelessComponent<{}> = () => {
  const auth = useAuth();
  const comp = auth?.authData ? <AuthenticatedApp /> : <UnauthenticatedApp />;
  return (<div className="App">{comp}</div>);
};

export default App;
