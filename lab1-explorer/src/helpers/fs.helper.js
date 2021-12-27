import { v4 } from 'uuid';
const fs = window.require('fs').promises;
const path = window.require('path');

export async function *walkAsync(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      yield* await walkAsync(path.join(dir, file.name));
    } else {
      yield path.join(dir, file.name);
    }
  }
  if (!files.length) yield dir;
};

const nestIterateFs = (currentLayerStructure, layerCount, components, permissions) => {
  let newLayerCount = layerCount;
  const componentByLayer = components[layerCount];
  const typeComponentByLayer = path.parse(componentByLayer).ext ? 'file' : 'directory';
  const nodeByComponent = currentLayerStructure.find(({ name }) => name === componentByLayer);

  const checkPermittionsToOne = permissions.length - 1 === layerCount
    ? permissions.find(({ path }) => componentByLayer === path[layerCount])
    : null;
  const conditionsToAdd = checkPermittionsToOne ?
    checkPermittionsToOne.allow
    && (
      (typeComponentByLayer === 'file' && checkPermittionsToOne.allow.includes('R'))
      || (typeComponentByLayer === 'directory' && checkPermittionsToOne.allow.includes('R') && checkPermittionsToOne.allow.includes('X'))
    ) : true;

  const parentCheckPermittions = permissions
    .find(({ path: currentPath }) => path.join(...components).includes(path.join(...currentPath)))
  console.log(layerCount, checkPermittionsToOne, conditionsToAdd, parentCheckPermittions);
  if (!nodeByComponent && (!checkPermittionsToOne || conditionsToAdd)) {
    const nodeChild = createFsNode(componentByLayer, typeComponentByLayer, checkPermittionsToOne, parentCheckPermittions);
    currentLayerStructure.push(nodeChild);
  } else if (nodeByComponent && (!checkPermittionsToOne || conditionsToAdd)) {
    newLayerCount += 1;
    if (nodeByComponent.type === 'directory') {
      nodeByComponent.children = Array.isArray(nodeByComponent.children) ? nodeByComponent.children : [];
    }
  }
  if (layerCount === components.length - 1 || !conditionsToAdd) return currentLayerStructure;
  return nestIterateFs(nodeByComponent ? nodeByComponent.children : currentLayerStructure, newLayerCount, components, permissions)
}

const createFsNode = (name, type, checkPermittions, parentCheckPermittions) => {
  const allow = ((checkPermittions
    && checkPermittions?.allow
    && checkPermittions?.allow?.includes('W')
    && (parentCheckPermittions && parentCheckPermittions.allow?.includes('W')))
      || (!checkPermittions && !parentCheckPermittions)) ? ['W'] : [];
  return {
    id: v4(),
    name,
    type,
    allow
  };
};

export const getFsComponentById = (id, currentLayerStructure) => {
  let result;
  const nodeByComponent = currentLayerStructure.find(layer => layer.id === id);
  if (nodeByComponent) {
    return nodeByComponent;
  }
  if (currentLayerStructure.length) {
    currentLayerStructure
      .some(nodeItem => (result = getFsComponentById(id, (nodeItem.children || []))));
  }
  return result;
};

export const getFilePathById = (id, currentLayerStructure, filePath = '') => {
  let result;
  const nodeByComponent = currentLayerStructure.find(layer => layer.id === id);
  if (nodeByComponent) {
    return path.resolve(filePath, nodeByComponent.name);
  }
  if (currentLayerStructure.length) {
    currentLayerStructure
      .some(nodeItem => (result = getFilePathById(id, (nodeItem.children || []), path.resolve(filePath, nodeItem.name))));
  }
  return result;
}

export const readFile = path => fs.readFile(path, 'utf-8');

export const createFsStructure = async (permissions = []) => {
  const structure = [];
  const rootFolder = 'fileSystem';
  const dir = path.join(process.cwd(), rootFolder);
  const fsComponents = [];
  for await (const fsComponent of walkAsync(dir)) {
    fsComponents.push(path.relative(process.cwd(), fsComponent));
  }
  const permissionsWithRelativePath = permissions.map(permission => ({
    ...permission,
    path: path.join(rootFolder, ...permission.path.split('://')).split(path.sep)
  }));
  for (const fsComponent of fsComponents) {
    const fsSplitComponent = fsComponent.split(path.sep);
    nestIterateFs(structure, 0, fsSplitComponent, permissionsWithRelativePath);
  }
  return structure;
};