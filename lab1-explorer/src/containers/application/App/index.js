import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Redirect, Switch } from 'react-router-dom';
import store from 'store/store';
import { MyContext } from 'providers/MyProvider';
import Authorization from 'containers/application/Authorization';
import FileExplorer from 'containers/application/FileExplorer';
import PrivateRoute from 'containers/route/PrivateRoute';
import PublicRoute from 'containers/route/PublicRoute';
import { authRoute, homeRoute } from './routes';
import { MuiThemeProvider } from '@material-ui/core';

import { theme } from 'styles/theme';

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <HashRouter>
        <Switch>
          <PublicRoute exact path={authRoute} component={Authorization} />
          <PrivateRoute exact path={homeRoute} component={FileExplorer} />
          <Redirect to={authRoute} />
        </Switch>
      </HashRouter>
    </MuiThemeProvider>
  </Provider>
);

export default App;
