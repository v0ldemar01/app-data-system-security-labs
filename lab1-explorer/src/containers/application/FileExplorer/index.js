import React, { useState } from 'react';
import NavigationArea from 'components/NavigationArea';
import Editor from 'components/Editor';
import AppLogo from '../AppLogo';
import { Box } from '@material-ui/core';
import { walkAsync } from 'helpers/fs.helper';

const FileExplorer = () => {
  const [fileOpen, setFileOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  return (
    <AppLogo>
      <Box display="flex">
        <NavigationArea />
        <Editor
          fileOpen={fileOpen}
          prevFile={selectedFile}
        />
      </Box>
    </AppLogo>
  )
};

export default FileExplorer;
