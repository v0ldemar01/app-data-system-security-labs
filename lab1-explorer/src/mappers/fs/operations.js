import { decrypt, encrypt } from 'helpers/crypto.helper';
import { getFilePathById } from './structure';

const fs = window.require('fs').promises;
const path = window.require('path');

export const readFile = path => fs.readFile(path, 'utf-8');

export const readDecryptFile = async path => {
  const fileContent = await readFile(path);
  const decryptedContent = await decrypt(fileContent);
  return decryptedContent;
};

export const writeFile = (path, content, isRewrite = false) => fs.writeFile(
  path, content, { encoding: 'utf8', ...(isRewrite ? { flag: 'w' } : {}) }
);

export const createFolder = async path => { 
  try {
    await fs.stat(path)
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(path);
    }
  }
};

export const renameFileOrFolder = (path, newPah) => fs.rename(path, newPah);

export const deleteFile = path => fs.unlink(path);

export const deleteFolder = path => fs.rm(path, { recursive: true });

export const createFileToFs = async (structure, { parentFolderId, fileName, content }) => {
  const folderPath = getFilePathById(parentFolderId, structure);
  const encryptedContent = await encrypt(content);
  await writeFile(path.resolve(folderPath, fileName), encryptedContent);
};

export const updateFileToFs = async (structure, { fileId, content }) => {
  const filePath = getFilePathById(fileId, structure);
  const encryptedContent = await encrypt(content);
  await writeFile(filePath, encryptedContent, true);
};

export const createFolderToFs = async (structure, { parentFolderId, folderName }) => {
  const folderPath = getFilePathById(parentFolderId, structure);
  await createFolder(path.resolve(folderPath, folderName))
};

export const renameNodeToFs = async (structure, { nodeId, newName }) => {
  const fullPath = getFilePathById(nodeId, structure);
  await renameFileOrFolder(fullPath, path.resolve(fullPath, '../', newName));
};

export const deleteFileToFs = async (structure, { fileId }) => {
  const fullPath = getFilePathById(fileId, structure);
  await deleteFile(fullPath);
};

export const deleteFolderToFs = async (structure, { folderId }) => {
  const fullPath = getFilePathById(folderId, structure);
  await deleteFolder(fullPath);
};
