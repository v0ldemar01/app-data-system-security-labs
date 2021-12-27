import { createAsyncThunk } from '@reduxjs/toolkit';
import { createFsStructure, getFilePathById, readFile } from 'helpers/fs.helper';
import { ActionType } from './common';

export const loadStructure = createAsyncThunk(
  ActionType.LOAD_STRUCTURE,
  async permissions => {
    const structure = await createFsStructure();
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
    let resultFile;
    if (expandedFile.id === fileId) {
      resultFile = {};
    } else {
      const filePath = getFilePathById(fileId, structure);
      if (!filePath) resultFile = {};
      resultFile = await readFile(filePath);
    }
    return { expandedFile: resultFile };
  }
);
