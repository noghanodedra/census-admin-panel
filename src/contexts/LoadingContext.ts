import React, { createContext } from 'react';

export interface ILoadingContext {
  loadingCount: number;
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext <ILoadingContext>({
  loadingCount: 0,
  showLoading: () => {},
  hideLoading: () => {},
});

export default LoadingContext;
