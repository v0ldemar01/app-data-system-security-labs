import React, { useCallback, useMemo } from 'react';
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
  faFolderPlus
} from '@fortawesome/free-solid-svg-icons';

import { useStyles } from './classes';

const FsTreeItem = ({
  id,
  name,
  isExpandedItem,
  layer,
  type,
  allow,
  toggleExpandedItem,
  onOpenFile,
  onOpenNewFile,
  onOpenFileForm,
  onOpenFolderForm,
  onRenameFolder,
  ...other
}) => {
  const classes = useStyles();

  const labelIcon = useMemo(
    () => layer === 0 ? faDesktop : layer === 1 ? faHdd : type === 'file' ? faFile : faFolder,
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
    type => event => {
      event.stopPropagation();
      if (!isExpandedItem) {
        toggleExpandedItem(id);
      }      
      onOpenFolderForm({
        type,
        folderId: id
      })
    },
    [
      id, 
      isExpandedItem, 
      onOpenFolderForm, 
      toggleExpandedItem
    ]
  );

  return (
    <TreeItem
      nodeId={id}
      label={
        <Box className={classes.labelRoot}>
          <FontAwesomeIcon icon={labelIcon} className={classes.labelIcon} />         
          <Typography variant="body2" className={classes.labelText}>
            {name}
          </Typography>
          {type === 'directory' && allow.includes('W') && layer > 1 && (
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
              <Tooltip title="Delete folder">
                <Box>
                  <FontAwesomeIcon icon={faMinusCircle} className={classes.labelIcon} size="sm" />
                </Box>
              </Tooltip>
            </Box>
          )}
          {type === 'file' && (
            <Tooltip title="Open a file">
              <Box>
                <FontAwesomeIcon
                  icon={faGlasses}
                  className={classes.labelIcon} size="sm"
                  onClick={handleOpenFile}
                />
              </Box>
            </Tooltip>
          )}
        </Box>
      }
      {...other}
      onClick={() => type === 'directory' ? toggleExpandedItem(id) : null}
    />
  );
};

export default FsTreeItem;
