import React from 'react';
import { Box } from '@material-ui/core';

import { useStyles } from './classes';

const AppLogo = ({
  children
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.logo}>
      {children}
    </Box>
  );
};

export default AppLogo;
