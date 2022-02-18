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

export const createFileToFs = async (structure, { parentFolderId, fileName, content }) => {
  const folderPath = getFilePathById(parentFolderId, structure);
  const encryptedContent = await encrypt(content);
  writeFile(path.resolve(folderPath, fileName), encryptedContent);
};

export const updateFileToFs = async (structure, { fileId, content }) => {
  const filePath = getFilePathById(fileId, structure);
  const encryptedContent = await encrypt(content);
  writeFile(filePath, encryptedContent, true);
};

export const createFolderToFs = async (structure, { parentFolderId, folderName }) => {
  const folderPath = getFilePathById(parentFolderId, structure);
  createFolder(path.resolve(folderPath, folderName))
}