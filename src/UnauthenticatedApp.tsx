import React, { FunctionComponent } from 'react';

const UnauthenticatedApp: FunctionComponent = ({ children }) => (
  <>
    <div><p>un-auth</p></div>
    {children}
  </>
);

export default UnauthenticatedApp;
