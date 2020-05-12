import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { Spinner } from 'components';
import AppProviders from 'providers/AppProviders';

import i18n from 'i18n';
import App from './src/App';

// import 'i18n';// https://www.robinwieruch.de/react-internationalization

// https://codex.happyfuncorp.com/styling-and-theming-with-material-ui-react-material-design-3ba2d2f0ef25
// https://blog.bam.tech/developer-news/get-the-best-of-your-react-app-design-by-using-material-ui-theme

// https://medium.com/@krzakmarek88/complex-form-validation-in-react-hooks-cb07367196b9

// https://medium.com/codefully-io/react-forms-validation-with-formik-and-material-ui-1adf0c1cae5c


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
