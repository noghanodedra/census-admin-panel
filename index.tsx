import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { Spinner } from 'components';
import AppProviders from 'providers/AppProviders';

import i18n from 'i18n';
import App from './src/App';

// eslint-disable-next-line react/no-render-return-value
i18n.init().then(() => ReactDOM.render(
  <Suspense fallback={null}>
    <AppProviders>
      <App />
      <Spinner />
    </AppProviders>
  </Suspense>,
  document.getElementById('root'),
));
