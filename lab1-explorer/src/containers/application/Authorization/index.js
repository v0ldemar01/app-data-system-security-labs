import React from 'react';
import AppLogo from 'containers/application/AppLogo';
import AuthForm from 'components/AuthForm';
import { Box, Paper } from '@material-ui/core';

import { useStyles } from './classes';

const Authorization = () => {
  const classes = useStyles();

  return (
    <AppLogo>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Paper elevation={2} className={classes.authContainer}>
          <AuthForm />
        </Paper>
      </Box>
    </AppLogo>
  );
};

export default Authorization;
