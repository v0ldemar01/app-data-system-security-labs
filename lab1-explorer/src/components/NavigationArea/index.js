import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fsActionCreator } from 'store/actions';
import { useCommonStyles } from 'components/styles/common';
import { createErrorDialog } from 'helpers/dialog.helper';
import clsx from 'clsx';
import FsTreeItem from 'components/FsTreeItem';
import NameForm from 'components/NameForm';
import { Box, Paper, Tooltip } from '@material-ui/core';
import { TreeView } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faMinus } from '@fortawesome/free-solid-svg-icons';
import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon
} from '@material-ui/icons';

import { useStyles } from './classes';

const NavigationArea = ({
  structure,
  loading,
  editorOpened,
  folderNameEditor,
  onOpenNewFile,
  onOpenFolderForm,
  onCloseFolderForm,
  onOpenFileForm,
  onCreateNewFolder,
  onRenameFolder
}) => {
  const [expanded, setExpanded] = useState([]);

  const dispatch = useDispatch();

  const { permissions } = useSelector(state => ({
    permissions: state.user.activeCredentials.permissions
  }));

  const classes = useStyles();
  const commonClasses = useCommonStyles();

  const toggleExpandedItem = useCallback(
    nodeId => setExpanded(prev => {
      if (prev.includes(nodeId)) {
        return prev.filter(item => item !== nodeId);
      }
      return [...prev, nodeId];
    }), 
    []
  );

  const checkExpandedItem = useCallback(nodeId => expanded.includes(nodeId), [expanded]);

  const loadFsStructure = useCallback(
    () => dispatch(fsActionCreator.loadStructure()),
    [dispatch]
  );

  const handleOpenFile = useCallback(
    id => { 
      if (editorOpened) {
        createErrorDialog('Failed open file', 'Please save or cancel opened file in editor')
      } else {
        dispatch(fsActionCreator.toggleExpandedFile(id))
      }
    },
    [editorOpened, dispatch]
  );

  const handleOpenNewFile = useCallback(
    parentFolderId => { 
      if (editorOpened) {
        createErrorDialog('Failed create file', 'Please save or cancel opened file in editor')
      } else {
        onOpenNewFile({ parentFolderId });
      }
    },
    [editorOpened, onOpenNewFile]
  );

  useEffect(() => {
    loadFsStructure();
  }, [permissions]);

  const renderTree = useCallback(
    (node, layer = 0) => {
      const renderChildren = Array.isArray(node.children) ? node.children
        .map(childNode => renderTree(childNode, layer + 1)) : null;
      return (
        <FsTreeItem
          key={node.id}
          layer={layer}
          {...node}
          isExpandedItem={checkExpandedItem(node.id)}
          onOpenFile={handleOpenFile}
          onOpenNewFile={handleOpenNewFile}
          onOpenFolderForm={onOpenFolderForm}
          onOpenFileForm={onOpenFileForm}
          onRenameFolder={onRenameFolder}
          toggleExpandedItem={toggleExpandedItem}
        >
          {node.type === 'directory' ? (
            <>
              {folderNameEditor && folderNameEditor?.type === 'create'
                && folderNameEditor?.folderId === node.id
                && (
                <Box display="flex" alignItems="center">
                  <FontAwesomeIcon icon={faFolder} className={classes.editorIcon} />
                  <NameForm
                    name="folderName"
                    value=""
                    onSubmitForm={onCreateNewFolder}
                  />
                  <Tooltip title="Close form">
                    <Box>
                      <FontAwesomeIcon
                        icon={faMinus}
                        size="sm"
                        className={classes.clearIcon}
                        onClick={onCloseFolderForm}
                      /> 
                    </Box>
                  </Tooltip>                              
                </Box>
              )}
              {renderChildren}
            </>
          ) : renderChildren}        
        </FsTreeItem>
      );
    },
    [
      folderNameEditor,
      handleOpenFile, 
      handleOpenNewFile, 
      onCreateNewFolder, 
      onRenameFolder,
      onOpenFolderForm,
      onOpenFileForm,
      toggleExpandedItem,
      checkExpandedItem
    ]
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
            expanded={expanded}
          >
            {structure.map(node => renderTree(node))}
          </TreeView>
        )}
      </Paper>
    </Box>
  );
};

export default NavigationArea;
