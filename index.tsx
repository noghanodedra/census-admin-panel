import React, { Suspense, StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { Spinner } from 'components';
import AppProviders from 'providers/AppProviders';

import i18n from 'i18n';
import App from './src/App';

// import 'i18n';// https://www.robinwieruch.de/react-internationalization

// https://codex.happyfuncorp.com/styling-and-theming-with-material-ui-react-material-design-3ba2d2f0ef25
// https://blog.bam.tech/developer-news/get-the-best-of-your-react-app-design-by-using-material-ui-theme

// https://github.com/jeyk333/React-CRUD-using-Material-Ui

// eslint-disable-next-line react/no-render-return-value
i18n.init().then(() => ReactDOM.render(
  <Suspense fallback={null}>
    <StrictMode>
      <AppProviders>
        <App />
        <Spinner />
      </AppProviders>
    </StrictMode>
  </Suspense>,
  document.getElementById('root'),
));
