const fs = window.require('fs').promises;

export const readFile = path => fs.readFile(path, 'utf-8');

export const writeFile = (path, content, isRewrite = false) => fs.writeFile(
  path, content, { encoding: 'utf8', ...(isRewrite ? { flag: 'w' } : {}) }
);
