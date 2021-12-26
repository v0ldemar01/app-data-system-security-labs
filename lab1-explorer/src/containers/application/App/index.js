import React, { useState } from 'react';
import { HashRouter, Redirect, Switch } from 'react-router-dom';
import { MyContext } from 'providers/MyProvider';
import Authorization from 'containers/application/Authorization';
import FileExplorer from 'containers/application/FileExplorer';
import PrivateRoute from 'containers/route/PrivateRoute';
import PublicRoute from 'containers/route/PublicRoute';
import { authRoute, homeRoute } from './routes';
import { MuiThemeProvider } from '@material-ui/core';

import { theme } from 'styles/theme';

const App = () => {
  const [auth, setAuth] = useState();

  return (
    <MuiThemeProvider theme={theme}>
      <MyContext.Provider value={{
        onAuth: setAuth
      }}>
        <HashRouter>
          <Switch>
            <PublicRoute exact isAuthorized={Boolean(auth)} path={authRoute} component={Authorization} />
            <PrivateRoute exact isAuthorized={Boolean(auth)} path={homeRoute} component={FileExplorer} />
            <Redirect to={authRoute} />
          </Switch>
        </HashRouter>
      </MyContext.Provider>
    </MuiThemeProvider>
  );
}

export default App;
