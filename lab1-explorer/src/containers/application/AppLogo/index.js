import React from 'react';
import PropTypes from 'prop-types';
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

AppLogo.propTypes = {
  children: PropTypes.node
};

AppLogo.defaultProps = {
  children: null
};

export default AppLogo;
