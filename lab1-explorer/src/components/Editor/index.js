import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { createDialog } from 'helpers/dialog.helper';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';

import { useStyles } from './classes';
import { useCommonStyles } from 'components/styles/common';
import { useFormStyles } from 'styles/form';

const Editor = ({
  fileOpen,
  expandedFile,
  onChangeFile
}) => {
  const [fileContent, setFileContent] = useState('');
  const [newFileName, setFileName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const commonFormClasses = useFormStyles();

  useEffect(() => {
    if (expandedFile && expandedFile.content) {
      setFileContent(expandedFile.content);
    }
  }, [expandedFile]);

  const handleContentChange = useCallback(event => setFileContent(event.target.value), []);

  const handleFileNameChange = useCallback(event => setFileName(event.target.value), []);

  const finalSaveFile = useCallback(
    () => {
      onChangeFile({
        content: fileContent,
        ...(expandedFile ? {
          fileName: expandedFile?.fileName
        } : {
          fileName: newFileName
        })
      });
      setFileContent('');
      setFileName('');
    },
    [fileContent, expandedFile, newFileName, onChangeFile]
  );

  const handleSaveFile = useCallback(
    () => {
      if (expandedFile) {
        finalSaveFile();
      } else if (!fileContent) {
        createDialog('Failed creating file', 'File cannot be empty')
      } else {
        setModalOpen(true);
      }
    },
    [expandedFile, fileContent, finalSaveFile]
  );

  const handleCloseModal = useCallback(() => setModalOpen(false), []);

  const modalSetFileName = useMemo(
    () => (
      <Dialog open={modalOpen} onClose={handleCloseModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new file</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter file name.
          </DialogContentText>
          <TextField
            disabled={!fileContent}
            variant="outlined"
            id="fileName"
            name="fileName"
            label="New file name"
            fullWidth
            value={newFileName}
            onChange={handleFileNameChange}
            className={commonFormClasses.formTextField}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={finalSaveFile} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    ),
    [
      modalOpen,
      newFileName,
      fileContent,
      handleCloseModal,
      finalSaveFile,
      handleFileNameChange
    ]
  );

  return (
    <Box display="flex" flex={2.5} justifyContent="center">
      <Paper elevation={3} className={commonClasses.paper}>
        {modalSetFileName}
        {fileOpen ? (
          <Box p={4}>
            <TextField
              id="file-content"
              label="File content"
              variant="outlined"
              multiline
              fullWidth
              rows={42}
              value={fileContent}
              onChange={handleContentChange}
              placeholder={expandedFile ? expandedFile?.content : ''}
              className={classes.formTextField}
            />
            <Box mt={3.5}>
              <Button
                variant="contained"
                color="primary"
                style={{ textTransform: 'none' }}
                onClick={handleSaveFile}
              >
                Save your changes
              </Button>
            </Box>
          </Box>
        ) : (
          <Box display="flex" alignItems="center" justifyContent="center" height="100%">
            <Typography variant="h5" className={classes.noCurrentFile}>
              Select or create file
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Editor;
