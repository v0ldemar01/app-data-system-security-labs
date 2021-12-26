import React from 'react';
import clsx from 'clsx';
import { Box, Paper } from '@material-ui/core';

import { useStyles } from './classes';
import { useCommonStyles } from 'components/styles/common';

const NavigationArea = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <Box display="flex" flex={1} justifyContent="center">
      <Paper className={clsx(commonClasses.paper, classes.paper)}>
        Herr
      </Paper>
    </Box>
  );
};

export default NavigationArea;
