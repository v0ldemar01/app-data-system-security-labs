import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavigationArea from 'components/NavigationArea';
import Editor from 'components/Editor';
import AppLogo from '../AppLogo';
import { Box } from '@material-ui/core';
import { fsActionCreator } from 'store/actions';


const FileExplorer = () => {
  const dispatch = useDispatch();

  const { structure, loading, expandedFile } = useSelector(state => ({
    structure: state.fs.structure,
    loading: state.fs.loading,
    expandedFile: state.fs.expandedFile
  }));

  const handleChangeFile = useCallback(
    file => dispatch(fsActionCreator.changeFileContent(file)),
    [dispatch]
  );

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
          onChangeFile={handleChangeFile}
        />
      </Box>
    </AppLogo>
  )
};

export default FileExplorer;
