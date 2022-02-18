import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavigationArea from 'components/NavigationArea';
import Editor from 'components/Editor';
import AppLogo from 'containers/application/AppLogo';
import { fsActionCreator } from 'store/actions';
import { Box } from '@material-ui/core';

const FileExplorer = () => {
  const [newFileOpened, setNewFileOpened] = useState();
  const [folderNameEditor, setFolderNameEditor] = useState();
  const [fileNameEditor, setFileNameEditor] = useState();

  const dispatch = useDispatch();

  const { structure, loading, expandedFile } = useSelector(state => ({
    structure: state.fs.structure,
    loading: state.fs.loading,
    expandedFile: state.fs.expandedFile
  }));

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

  const handleCreateNewFile = useCallback(
    file => {
      dispatch(fsActionCreator.createFile({ ...file, ...newFileOpened }));
      setNewFileOpened();
    },
    [newFileOpened, dispatch]
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
    () => {
      dispatch(fsActionCreator.renameFolder({
        folderId: folderNameEditor.folderId,
        value: folderNameEditor.value
      }));
      setFolderNameEditor();
    },
    [folderNameEditor, dispatch]
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
          folderNameEditor={folderNameEditor}
          onOpenNewFile={setNewFileOpened}
          onOpenFolderForm={handleOpenFolderForm}
          onCloseFolderForm={handleCloseFolderForm}
          onOpenFileForm={handleOpenFileForm}
          onCreateNewFolder={handleCreateNewFolder}
          onRenameFolder={handleRenameFolder}
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
