import { createAsyncThunk } from '@reduxjs/toolkit';
import { createErrorDialog, createSuccessDialog } from 'helpers/dialog.helper';
import {
  createFsNodeToStructure,
  createFsStructure,
  getFilePathById,
  getFsComponentById
} from 'mappers/fs/structure';
import {
  createFileToFs,
  createFolderToFs,
  readDecryptFile,
  updateFileToFs
} from 'mappers/fs/operations';
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
      }
    } = getState();
    const newStructure = createFsNodeToStructure(structure, { 
      parentFolderId: data.parentFolderId,
      nodeName: data.fileName
    });
    await createFileToFs(structure, data);
    return { structure: newStructure };   
  }
);

export const createFolder = createAsyncThunk(
  ActionType.CREATE_DIRECTORY,
  async (data, { getState }) => {
    const {
      fs: {
        structure
      }
    } = getState();
    const newStructure = createFsNodeToStructure(structure, { 
      parentFolderId: data.parentFolderId,
      nodeName: data.folderName
    });
    await createFolderToFs(structure, data);
    return { structure: newStructure };
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
        const fileDecryptedContent = await readDecryptFile(filePath);
        resultFile = {
          id: fileId,
          content: fileDecryptedContent,
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
    updateFileToFs(structure, { fileId: expandedFile.id, content: newFile.content });
    createSuccessDialog('Update file is successful', '')
    return {};
  }
);

export const renameFolder = createAsyncThunk(
  ActionType.RENAME_DIRECTORY,
  data => data
)