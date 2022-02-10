import { createAsyncThunk } from '@reduxjs/toolkit';
import { decrypt, encrypt } from 'helpers/crypto.helper';
import { createErrorDialog, createSuccessDialog } from 'helpers/dialog.helper';
import { createFileByParent, createFsStructure, getFilePathById, getFsComponentById, readFile, writeFile } from 'helpers/fs.helper';
import { ActionType } from './common';

export const loadStructure = createAsyncThunk(
  ActionType.LOAD_STRUCTURE,
  async (_, { getState }) => {
    const {
      user: {
        activeCredentials: {
          permissions
        }
      }
    } = getState();
    const structure = await createFsStructure(permissions);
    return { structure };
  }
);

export const createFile = createAsyncThunk(
  ActionType.CREATE_FILE,
  async (data, { getState }) => {
    const {
      fs: {
        structure
      },
      user: {
        activeCredentials: {
          permissions
        }
      }
    } = getState();
    await createFileByParent(structure, permissions, data);
  }
);

export const createFolder = createAsyncThunk(
  ActionType.CREATE_DIRECTORY,
  config => config
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
        const decryptedContent = await decrypt(fileContent);
        resultFile = {
          id: fileId,
          content: decryptedContent,
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
    const encryptedContent = await encrypt(newFile.content);
    writeFile(filePath, encryptedContent, true);
    createSuccessDialog('Update file is successful', '')
    return {};
  }
);
