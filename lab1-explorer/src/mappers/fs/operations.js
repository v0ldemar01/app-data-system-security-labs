import { decrypt, encrypt } from 'helpers/crypto.helper';
import { getFilePathById } from './structure';

const fs = window.require('fs').promises;
const path = window.require('path');

export const readFile = filePath => fs.readFile(filePath, 'utf-8');

export const readDecryptFile = async filePath => {
  const fileContent = await readFile(filePath);
  const decryptedContent = await decrypt(fileContent);
  return decryptedContent;
};

export const writeFile = (filePath, content, isRewrite = false) => fs.writeFile(
  filePath,
  content,
  { encoding: 'utf8', ...(isRewrite ? { flag: 'w' } : {}) }
);

export const createFolder = async folderPath => {
  try {
    await fs.stat(folderPath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(folderPath);
    }
  }
};

export const renameFileOrFolder = (folderPath, newPah) => fs.rename(folderPath, newPah);

export const deleteFile = folderPath => fs.unlink(folderPath);

export const deleteFolder = folderPath => fs.rm(folderPath, { recursive: true });

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

  await createFolder(path.resolve(folderPath, folderName));
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
