import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { Spinner } from 'components';
import AppProviders from 'providers/AppProviders';

import App from './src/App';
import 'i18n';// https://www.robinwieruch.de/react-internationalization

// https://codex.happyfuncorp.com/styling-and-theming-with-material-ui-react-material-design-3ba2d2f0ef25
// https://blog.bam.tech/developer-news/get-the-best-of-your-react-app-design-by-using-material-ui-theme
ReactDOM.render(
  <Suspense fallback={null}>
    <AppProviders>
      <App />
      <Spinner />
    </AppProviders>
  </Suspense>,
  document.getElementById('root'),
);
