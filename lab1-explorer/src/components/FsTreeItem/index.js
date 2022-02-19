/* eslint-disable no-nested-ternary */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import NameEditor from 'components/NameEditor';
import { TreeItem } from '@material-ui/lab';
import { Box, Tooltip, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDesktop,
  faHdd,
  faFolder,
  faUserEdit,
  faMinusCircle,
  faFileSignature,
  faFile,
  faGlasses,
  faFolderPlus,
  faScroll,
  faArrowAltCircleRight
} from '@fortawesome/free-solid-svg-icons';

import { useStyles } from './classes';

const FsTreeItem = ({
  id,
  name,
  isExpandedItem,
  isExpandedItemActions,
  layer,
  type,
  allow,
  nameEditorActive,
  toggleExpandedItem,
  toggleExpandedItemActions,
  onOpenFile,
  onOpenNewFile,
  onOpenFileForm,
  onOpenFolderForm,
  onRenameFolder,
  onRenameFile,
  onDeleteFolder,
  onDeleteFile,
  onCloseNodeForm,
  ...other
}) => {
  const classes = useStyles();

  const labelIcon = useMemo(
    () => (layer === 0 ? faDesktop : layer === 1 ? faHdd : type === 'file' ? faFile : faFolder),
    [layer, type]
  );

  const handleOpenFile = useCallback(
    event => {
      event.stopPropagation();
      onOpenFile(id);
    },
    [id, onOpenFile]
  );

  const handleOpenNewFile = useCallback(
    event => {
      event.stopPropagation();
      onOpenNewFile(id);
    },
    [id, onOpenNewFile]
  );

  const handleOpenFolderForm = useCallback(
    folderFormType => event => {
      event.stopPropagation();
      if (!isExpandedItem && folderFormType === 'create') {
        toggleExpandedItem(id);
      }
      onOpenFolderForm({
        type: folderFormType,
        folderId: id
      });
    },
    [
      id,
      isExpandedItem,
      onOpenFolderForm,
      toggleExpandedItem
    ]
  );

  const handleOpenFileForm = useCallback(
    () => {
      onOpenFileForm({
        fileId: id
      });
    },
    [
      id,
      onOpenFileForm
    ]
  );

  const handleToggleExpandedItemActions = useCallback(
    event => {
      event.stopPropagation();
      toggleExpandedItemActions(id);
    },
    [id, toggleExpandedItemActions]
  );

  const handleRenameNodeName = useCallback(
    values => {
      if (type === 'directory') {
        onRenameFolder(values);
      } else {
        onRenameFile(values);
      }
    },
    [type, onRenameFolder, onRenameFile]
  );

  const handleDeleteNode = useCallback(
    () => {
      if (type === 'directory') {
        onDeleteFolder({ folderId: id });
      } else {
        onDeleteFile({ fileId: id });
      }
    },
    [id, type, onDeleteFolder, onDeleteFile]
  );

  return (
    <TreeItem
      nodeId={id}
      label={(
        <Box className={classes.labelRoot}>
          <FontAwesomeIcon icon={labelIcon} className={classes.labelIcon} />
          {nameEditorActive ? (
            <NameEditor
              name={`new${type === 'directory' ? 'Folder' : 'File'}Name`}
              value={name}
              onSubmitForm={handleRenameNodeName}
              onCloseForm={onCloseNodeForm}
            />
          ) : (
            <Typography variant="body2" className={classes.labelText}>
              {name}
            </Typography>
          )}
          {!nameEditorActive && allow.includes('W') && (
            isExpandedItemActions ? (
              <>
                {type === 'directory' && (
                  <Box display="flex" ml={1}>
                    <Tooltip title="Add a file">
                      <Box>
                        <FontAwesomeIcon
                          icon={faFileSignature}
                          className={classes.labelIcon}
                          size="sm"
                          onClick={handleOpenNewFile}
                        />
                      </Box>
                    </Tooltip>
                    <Tooltip title="Add a folder">
                      <Box>
                        <FontAwesomeIcon
                          icon={faFolderPlus}
                          className={classes.labelIcon}
                          size="sm"
                          onClick={handleOpenFolderForm('create')}
                        />
                      </Box>
                    </Tooltip>
                    <Tooltip title="Edit folder">
                      <Box>
                        <FontAwesomeIcon
                          icon={faUserEdit}
                          className={classes.labelIcon}
                          size="sm"
                          onClick={handleOpenFolderForm('update')}
                        />
                      </Box>
                    </Tooltip>
                    {layer > 1 && (
                      <Tooltip title="Delete folder">
                        <Box>
                          <FontAwesomeIcon
                            icon={faMinusCircle}
                            className={classes.labelIcon}
                            size="sm"
                            onClick={handleDeleteNode}
                          />
                        </Box>
                      </Tooltip>
                    )}
                  </Box>
                )}
                {type === 'file' && (
                  <Box display="flex" ml={1}>
                    <Tooltip title="Edit file">
                      <Box>
                        <FontAwesomeIcon
                          icon={faUserEdit}
                          className={classes.labelIcon}
                          size="sm"
                          onClick={handleOpenFileForm}
                        />
                      </Box>
                    </Tooltip>
                    <Tooltip title="Delete file">
                      <Box>
                        <FontAwesomeIcon
                          icon={faMinusCircle}
                          className={classes.labelIcon}
                          size="sm"
                          onClick={handleDeleteNode}
                        />
                      </Box>
                    </Tooltip>
                    <Tooltip title="Open a file">
                      <Box>
                        <FontAwesomeIcon
                          icon={faGlasses}
                          className={classes.labelIcon}
                          size="sm"
                          onClick={handleOpenFile}
                        />
                      </Box>
                    </Tooltip>
                  </Box>
                )}
                <Tooltip title="Hide actions">
                  <Box>
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      className={classes.labelIcon}
                      size="sm"
                      onClick={handleToggleExpandedItemActions}
                    />
                  </Box>
                </Tooltip>
              </>
            ) : (
              <Tooltip title="Expanded actions">
                <Box>
                  <FontAwesomeIcon
                    icon={faScroll}
                    className={classes.labelIcon}
                    size="sm"
                    onClick={handleToggleExpandedItemActions}
                  />
                </Box>
              </Tooltip>
            )
          )}
        </Box>
      )}
      {...other}
      onClick={() => (type === 'directory' ? toggleExpandedItem(id) : null)}
    />
  );
};

FsTreeItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isExpandedItem: PropTypes.bool.isRequired,
  isExpandedItemActions: PropTypes.bool.isRequired,
  layer: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['directory', 'folder']).isRequired,
  allow: PropTypes.arrayOf(['W', 'R', 'X']).isRequired,
  nameEditorActive: PropTypes.bool.isRequired,
  toggleExpandedItem: PropTypes.func.isRequired,
  toggleExpandedItemActions: PropTypes.func.isRequired,
  onOpenFile: PropTypes.func.isRequired,
  onOpenNewFile: PropTypes.func.isRequired,
  onOpenFileForm: PropTypes.func.isRequired,
  onOpenFolderForm: PropTypes.func.isRequired,
  onRenameFolder: PropTypes.func.isRequired,
  onRenameFile: PropTypes.func.isRequired,
  onDeleteFolder: PropTypes.func.isRequired,
  onDeleteFile: PropTypes.func.isRequired,
  onCloseNodeForm: PropTypes.func.isRequired
};

export default FsTreeItem;
