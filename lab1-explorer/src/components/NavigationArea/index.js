import React, { useState } from 'react';
import { useCommonStyles } from 'components/styles/common';
import { createFsStructure } from 'helpers/fs.helper';
import clsx from 'clsx';
import { Box, Paper } from '@material-ui/core';
import { TreeView, TreeItem } from '@material-ui/lab';
import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon
} from '@material-ui/icons';


import { useStyles } from './classes';
import { useEffect } from 'react';


(async () => {
  await createFsStructure();
})()
const NavigationArea = () => {
  const [fsStructure, setFsStructure] = useState([]);
  console.log('fsStructure', fsStructure);
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  useEffect(() => {
    createFsStructure().then(setFsStructure)
  }, []);

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  return (
    <Box display="flex" flex={1} justifyContent="center">
      <Paper className={clsx(commonClasses.paper, classes.paper)}>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          defaultExpanded={['root']}
        />
      </Paper>
    </Box>
  );
};

export default NavigationArea;
