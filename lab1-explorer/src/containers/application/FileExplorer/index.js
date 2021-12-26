import React from 'react';
import NavigationArea from 'components/NavigationArea';
import Editor from 'components/Editor';
import AppLogo from '../AppLogo';
import { Box } from '@material-ui/core';

const FileExplorer = () => {
  return (
    <AppLogo>
      <Box display="flex">
        <NavigationArea />
        <Editor />
      </Box>
    </AppLogo>
  )
};

export default FileExplorer;
