import React from 'react';
import ReactDOM from 'react-dom';

// Lang import
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import App from './App';

// Old render without Lang
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<I18nextProvider i18n={ i18n }><App /></I18nextProvider>, document.getElementById('root'));
