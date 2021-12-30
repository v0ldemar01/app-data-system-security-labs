import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fsActionCreator } from 'store/actions';
import { useCommonStyles } from 'components/styles/common';
import FsTreeItem from 'components/FsTreeItem';
import clsx from 'clsx';
import { Box, Paper } from '@material-ui/core';
import { TreeView } from '@material-ui/lab';
import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon
} from '@material-ui/icons';

import { useStyles } from './classes';

const NavigationArea = ({
  structure,
  loading
}) => {
  const dispatch = useDispatch();
  console.log('fsStructure', structure);
  const { permissions } = useSelector(state => ({
    permissions: state.user.activeCredentials.permissions
  }));

  const classes = useStyles();
  const commonClasses = useCommonStyles();

  const loadFsStructure = useCallback(
    () => dispatch(fsActionCreator.loadStructure(permissions)),
    [permissions, dispatch]
  );

  const handleOpenFile = useCallback(
    id => dispatch(fsActionCreator.toggleExpandedFile(id)),
    [dispatch]
  );

  useEffect(() => {
    loadFsStructure();
  }, [permissions]);

  const renderTree = useCallback(
    (node, layer = 0) => (
      <FsTreeItem key={node.id} layer={layer} {...node} onOpenFile={handleOpenFile}>
        {Array.isArray(node.children) ? node.children
          .map(childNode => renderTree(childNode, layer + 1)) : null}
      </FsTreeItem>
    ),
    [handleOpenFile]
  );

  return (
    <Box display="flex" flex={1} justifyContent="center">
      <Paper className={clsx(commonClasses.paper, classes.paper)}>
        {loading ? (
          <Box />
        ) : (
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultExpanded={['root']}
          >
            {structure.map(node => renderTree(node))}
          </TreeView>
        )}
      </Paper>
    </Box>
  );
};

export default NavigationArea;
