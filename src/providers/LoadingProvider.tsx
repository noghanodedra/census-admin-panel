import React, { useState, FunctionComponent } from 'react';
import { LoadingContext } from 'contexts';
import { ILoadingContext } from 'contexts/LoadingContext';

const LoadingProvider: FunctionComponent = ({ children }) => {
  const showLoading = () => {
    toggleLoading((prevState) => ({
      ...prevState,
      loadingCount: prevState.loadingCount + 1,
    }));
  };

  const hideLoading = () => {
    toggleLoading((prevState) => ({
      ...prevState,
      loadingCount: prevState.loadingCount > 0
        ? prevState.loadingCount - 1 : 0,
    }));
  };

  const loadingState = {
    loadingCount: 0,
    showLoading,
    hideLoading,
  };

  const [loading, toggleLoading] = useState(loadingState);

  return (
    <LoadingContext.Provider value={loading}>
      {children}
    </LoadingContext.Provider>);
};

const useLoading = (): ILoadingContext => {
  const context = React.useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a AppProvider');
  }
  return context;
};

export { LoadingProvider, useLoading };
