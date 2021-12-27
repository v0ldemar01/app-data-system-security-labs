import React from 'react';
import { useSelector } from 'react-redux';
import NavigationArea from 'components/NavigationArea';
import Editor from 'components/Editor';
import AppLogo from '../AppLogo';
import { Box } from '@material-ui/core';


const FileExplorer = () => {
  const { structure, loading, expandedFile } = useSelector(state => ({
    structure: state.fs.structure,
    loading: state.fs.loading,
    expandedFile: state.fs.expandedFile
  }));

  return (
    <AppLogo>
      <Box display="flex">
        <NavigationArea
          structure={structure}
          loading={loading}
        />
        <Editor
          fileOpen={Boolean(expandedFile)}
          expandedFile={expandedFile}
        />
      </Box>
    </AppLogo>
  )
};

export default FileExplorer;
