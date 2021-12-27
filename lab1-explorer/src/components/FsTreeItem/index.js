import React, { useMemo } from 'react';
import { TreeItem } from '@material-ui/lab';
import { Box, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faHdd, faFolder, faUserEdit, faMinusCircle, faPlus, faFile } from '@fortawesome/free-solid-svg-icons';

import { useStyles } from './classes';

const FsTreeItem = ({
  id,
  name,
  layer,
  type,
  allow,
  ...other
}) => {
  const classes = useStyles();

  const labelIcon = useMemo(
    () => layer === 0 ? faDesktop : layer === 1 ? faHdd : type === 'file' ? faFile : faFolder,
    [layer, type]
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
          {allow.includes('W') && layer > 1 && (
            <Box display="flex">
              <FontAwesomeIcon icon={faPlus} className={classes.labelIcon} size="sm" />
              <FontAwesomeIcon icon={faUserEdit} className={classes.labelIcon} size="sm" />
              <FontAwesomeIcon icon={faMinusCircle} className={classes.labelIcon} size="sm" />
            </Box>
          )}
        </Box>
      }
      {...other}
    />
  );
};

export default FsTreeItem;
