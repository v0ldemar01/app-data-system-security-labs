import { createAsyncThunk } from '@reduxjs/toolkit';
import { createErrorDialog, createSuccessDialog } from 'helpers/dialog.helper';
import { createFsStructure, getFilePathById, getFsComponentById, readFile, writeFile } from 'helpers/fs.helper';
import { ActionType } from './common';

export const loadStructure = createAsyncThunk(
  ActionType.LOAD_STRUCTURE,
  async permissions => {
    const structure = await createFsStructure(permissions);
    return { structure };
  }
);

export const toggleExpandedFile = createAsyncThunk(
  ActionType.SET_EXPANDED_FILE,
  async (fileId, { getState }) => {
    const {
      fs: {
        structure,
        expandedFile
      }
    } = getState();
    let resultFile = null;
    if (expandedFile?.id !== fileId) {
      const filePath = getFilePathById(fileId, structure);
      const { allow } = getFsComponentById(fileId, structure);
      if (filePath) {
        const fileContent = await readFile(filePath);
        resultFile = {
          id: fileId,
          content: fileContent,
          allow
        };
      }
    }
    return { expandedFile: resultFile };
  }
);

export const changeFileContent = createAsyncThunk(
  ActionType.CHANGE_FILE_CONTENT,
  async (newFile, { getState, rejectWithValue }) => {
    const {
      fs: {
        structure,
        expandedFile
      }
    } = getState();
    if (!expandedFile.allow.includes('W')) {
      createErrorDialog('Failed update a file', 'No permission for doing it')
      return rejectWithValue();
    }
    const filePath = getFilePathById(expandedFile.id, structure);
    writeFile(filePath, newFile.content, true);
    createSuccessDialog('Update file is successful', '')
    return {};
  }
);
