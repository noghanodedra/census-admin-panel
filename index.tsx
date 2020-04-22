import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { Spinner } from 'components';
import AppProviders from 'providers/AppProviders';

import App from './src/App';
import 'i18n';// https://www.robinwieruch.de/react-internationalization


ReactDOM.render(
  <Suspense fallback={null}>
    <AppProviders>
      <App />
      <Spinner />
    </AppProviders>
  </Suspense>,
  document.getElementById('root'),
);
