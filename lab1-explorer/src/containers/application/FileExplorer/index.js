import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavigationArea from 'components/NavigationArea';
import Editor from 'components/Editor';
import AppLogo from 'containers/application/AppLogo';
import { fsActionCreator } from 'store/actions';
import { Box } from '@material-ui/core';

const FileExplorer = () => {
  const [newFileOpened, setNewFileOpened] = useState();

  const dispatch = useDispatch();

  const { structure, loading, expandedFile } = useSelector(state => ({
    structure: state.fs.structure,
    loading: state.fs.loading,
    expandedFile: state.fs.expandedFile
  }));

  const handleCreateNewFile = useCallback(
    file => {
      dispatch(fsActionCreator.createFile({ ...file, ...newFileOpened }));
      setNewFileOpened();
    },
    [newFileOpened, dispatch]
  );

  const handleChangeFile = useCallback(
    file => dispatch(fsActionCreator.changeFileContent(file)),
    [dispatch]
  );

  const handleCloseFile = useCallback(
    () => { 
      if (expandedFile) {
        dispatch(fsActionCreator.toggleExpandedFile(expandedFile?.id));
      } else {
        setNewFileOpened();
      }
    },
    [expandedFile, dispatch]
  );

  return (
    <AppLogo>
      <Box display="flex">
        <NavigationArea
          structure={structure}
          loading={loading}
          editorOpened={Boolean(expandedFile || newFileOpened)}
          onOpenNewFile={setNewFileOpened}
        />
        <Editor
          fileOpen={Boolean(expandedFile || newFileOpened)}
          expandedFile={expandedFile}
          onCreateNewFile={handleCreateNewFile}
          onChangeFile={handleChangeFile}
          handleCloseFile={handleCloseFile}
        />
      </Box>
    </AppLogo>
  );
};

export default FileExplorer;
