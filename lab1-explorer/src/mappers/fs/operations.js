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

export const createFileToFs = async (structure, { parentFolderId, fileName, content }) => {
  const filePath = getFilePathById(parentFolderId, structure);
  const encryptedContent = await encrypt(content);
  writeFile(path.resolve(filePath, fileName), encryptedContent);
};

export const updateFileToFs = async (structure, { fileId, content }) => {
  const filePath = getFilePathById(fileId, structure);
  const encryptedContent = await encrypt(content);
  writeFile(filePath, encryptedContent, true);
};
