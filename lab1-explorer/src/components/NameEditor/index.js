import React from 'react';
import NameForm from 'components/NameForm';
import { Box, Tooltip } from '@material-ui/core';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useStyles } from './classes';

const NameEditor = ({
  name,
  value,
  onSubmitForm,
  onCloseForm
}) => {
  const classes = useStyles();
  return (
    <>
      <NameForm
        name={name}
        value={value}
        onSubmitForm={onSubmitForm}
      />
      <Tooltip title="Close form">
        <Box>
          <FontAwesomeIcon
            icon={faMinus}
            size="sm"
            className={classes.clearIcon}
            onClick={onCloseForm}
          /> 
        </Box>
      </Tooltip>
    </>
  );
};

export default NameEditor;
