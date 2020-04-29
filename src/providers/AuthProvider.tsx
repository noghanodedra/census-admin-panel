import React, {
  FunctionComponent, useState, useEffect,
} from 'react';
import { AuthContext } from 'contexts';

const AuthProvider: FunctionComponent = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  // code for pre-loading the user's information if we have their token in

  // localStorage goes here

  // 🚨 this is the important bit.

  // Normally your provider components render the context provider with a value.

  // But we post-pone rendering any of the children until after we've determined

  // whether or not we have a user token and if we do, then we render a spinner

  // while we go retrieve that user's information.

  // if (weAreStillWaitingToGetTheUserData) {
  //   return <FullPageSpinner />;
  // }

  useEffect(() => {
    // const currentAuthData = someManager.getAuthData();
    // if (currentAuthData) {
    //   setAuthData(currentAuthData);
    // }
  }, []);

  const onLogout = () => setAuthData(null);

  const onLogin = (newAuthData: object) => setAuthData(newAuthData);


  // note, I'm not bothering to optimize this `value` with React.useMemo here

  // because this is the top-most component rendered in our app and it will very

  // rarely re-render/cause a performance problem.

  return (
    <AuthContext.Provider
      value={{
        authData,
        onLogout,
        onLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
