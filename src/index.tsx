import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';
import Theme from './Theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={Theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>
);
