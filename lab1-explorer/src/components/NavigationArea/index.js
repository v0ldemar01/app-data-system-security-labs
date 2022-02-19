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
import NameEditor from 'components/NameEditor';

const NavigationArea = ({
  structure,
  loading,
  editorOpened,
  onOpenNewFile
}) => {
  const [folderNameEditor, setFolderNameEditor] = useState();
  const [fileNameEditor, setFileNameEditor] = useState();
  const [expanded, setExpanded] = useState([]);
  const [expandedActions, setExpandedActions] = useState([]);

  const dispatch = useDispatch();

  const { permissions } = useSelector(state => ({
    permissions: state.user.activeCredentials.permissions
  }));

  const classes = useStyles();
  const commonClasses = useCommonStyles();

  
  useEffect(() => {
    loadFsStructure();
  }, [permissions]);

  const handleOpenFolderForm = useCallback(
    data => setFolderNameEditor({ ...data, value: '' }), 
    []
  );

  const handleCloseFolderForm = useCallback(
    () => setFolderNameEditor(),
    []
  );

  const handleOpenFileForm = useCallback(
    data => setFileNameEditor({ ...data, value: '' }), 
    []
  );

    const handleCreateNewFolder = useCallback(
    ({ folderName }) => {
      dispatch(fsActionCreator.createFolder({
        parentFolderId: folderNameEditor.folderId,
        folderName
      }));
      setFolderNameEditor();
    },
    [folderNameEditor, dispatch]
  );

  const handleRenameFolder = useCallback(
    ({ newFolderName }) => {
      dispatch(fsActionCreator.changeFolderName({
        folderId: folderNameEditor.folderId,
        newFolderName
      }));
      setFolderNameEditor();
    },
    [folderNameEditor, dispatch]
  );

  const handleRenameFile = useCallback(
    ({ newFileName }) => {
      dispatch(fsActionCreator.changeFileName({
        fileId: fileNameEditor.fileId,
        newFileName
      }));
      setFileNameEditor();
    },
    [fileNameEditor, dispatch]
  );

  const handleCloseNodeForm = useCallback(
    () => {
      if (fileNameEditor) {
        setFileNameEditor();
      }
      if (folderNameEditor) {
        setFolderNameEditor();
      }
    },
    [fileNameEditor, folderNameEditor]
  );

  const toggleExpandedItem = useCallback(
    nodeId => setExpanded(prev => {
      if (prev.includes(nodeId)) {
        return prev.filter(item => item !== nodeId);
      }
      return [...prev, nodeId];
    }), 
    []
  );

  const toggleExpandedItemActions = useCallback(
    nodeId => setExpandedActions(prev => {
      if (prev.includes(nodeId)) {
        return prev.filter(item => item !== nodeId);
      }
      return [...prev, nodeId];
    }), 
    []
  );

  const checkExpandedItem = useCallback(nodeId => expanded.includes(nodeId), [expanded]);

  const checkExpandedItemActions = useCallback(
    nodeId => expandedActions.includes(nodeId),
    [expandedActions]
  );

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

  const renderTree = useCallback(
    (node, layer = 0) => {
      const renderChildren = Array.isArray(node.children) ? node.children
        .map(childNode => renderTree(childNode, layer + 1)) : null;
      return (
        <FsTreeItem
          key={node.id}
          layer={layer}
          {...node}
          nameEditorActive={
            (folderNameEditor?.type === 'update'
              && folderNameEditor?.folderId === node.id)
            || fileNameEditor?.fileId === node.id
          }
          isExpandedItem={checkExpandedItem(node.id)}
          isExpandedItemActions={checkExpandedItemActions(node.id)}
          onOpenFile={handleOpenFile}
          onOpenNewFile={handleOpenNewFile}
          onOpenFolderForm={handleOpenFolderForm}
          onOpenFileForm={handleOpenFileForm}
          onRenameFolder={handleRenameFolder}
          onRenameFile={handleRenameFile}
          onCloseNodeForm={handleCloseNodeForm}
          toggleExpandedItem={toggleExpandedItem}
          toggleExpandedItemActions={toggleExpandedItemActions}
        >
          {node.type === 'directory' ? (
            <>
              {folderNameEditor && folderNameEditor?.type === 'create'
                && folderNameEditor?.folderId === node.id
                && (
                <Box display="flex" alignItems="center">
                  <FontAwesomeIcon icon={faFolder} className={classes.editorIcon} />
                  <NameEditor
                    name="folderName"
                    value=""
                    onSubmitForm={handleCreateNewFolder}
                    onCloseForm={handleCloseFolderForm}
                  />
                </Box>
              )}
              {renderChildren}
            </>
          ) : renderChildren}        
        </FsTreeItem>
      );
    },
    [
      fileNameEditor,
      folderNameEditor,
      handleOpenFile, 
      handleOpenNewFile, 
      handleCreateNewFolder, 
      handleRenameFolder,
      handleRenameFile,
      handleOpenFolderForm,
      handleCloseFolderForm,
      handleCloseNodeForm,
      handleOpenFileForm,
      toggleExpandedItem,
      toggleExpandedItemActions,
      checkExpandedItem,
      checkExpandedItemActions
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
