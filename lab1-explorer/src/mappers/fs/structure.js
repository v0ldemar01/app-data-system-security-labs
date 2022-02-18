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


export const getFsComponentById = (id, currentLayerStructure = []) => {
  let result;
  const nodeByComponent = currentLayerStructure
      .find(layer => layer.id === id);
  if (nodeByComponent) {
    return nodeByComponent;
  }
  if (currentLayerStructure.length) {
    currentLayerStructure
      .some(nodeItem => (result = getFsComponentById(
        id,
        (nodeItem.children || [])
      )));
  }
  return result;
};

export const getFilePathById = (id, currentLayerStructure = [], filePath = '') => {
  let result;
  const nodeByComponent = currentLayerStructure
    .find(layer => layer.id === id);
  if (nodeByComponent) {
    return path.resolve(filePath, nodeByComponent.name);
  }
  if (currentLayerStructure.length) {
    currentLayerStructure
      .some(nodeItem => (result = getFilePathById(
        id,
        (nodeItem.children || []),
        path.resolve(filePath, nodeItem.name))
      ));
  }
  return result;
};

const getTypeComponent = componentByLayer => path.parse(componentByLayer).ext
  ? 'file'
  : 'directory';

const checkNodePermissionsForAdding = (nodeRules, type) => 
  nodeRules 
  && nodeRules.allow
  && (
    (type === 'file' && nodeRules.allow.includes('R'))
    || (type === 'directory'
    && nodeRules.allow.includes('R') && nodeRules.allow.includes('X')));

const createFsNode = (name, type, allow) => {
  return {
    id: v4(),
    name,
    type,
    allow: Array.isArray(allow) ? allow : []
  };
};

export const createFsNodeToStructure = (faStructure, { parentFolderId, nodeName }) => {
  const newFsStructure = JSON.parse(JSON.stringify(faStructure));
  const component = getFsComponentById(parentFolderId, newFsStructure);
  const type = getTypeComponent(nodeName);
  const node = createFsNode(nodeName, type, component.allow);
  component.children = Array.isArray(component.children) ? component.children : [];
  component.children.push(node);
  return newFsStructure;
};

const iterateFileSystem = (currentLayerStructure, layerCount, components, permissions) => {
  let newLayerCount = layerCount;
  const componentByLayer = components[layerCount];
  const typeComponentByLayer = getTypeComponent(componentByLayer);
  const nodeByComponent = currentLayerStructure
    .find(({ name }) => name === componentByLayer);
  
  const checkDirectPermissions = permissions
    .find(({ path }) => (path || []).length - 1 === layerCount 
      && componentByLayer === (path || [])[layerCount]);
  const conditionToAdd = checkNodePermissionsForAdding(checkDirectPermissions, typeComponentByLayer);

  const checkParentPermissions = permissions
    .find(({ path: currentPath }) => path.join(...components.slice(0, newLayerCount + 1))
      .includes(path.join(...currentPath)));
  const parentConditionToAdd = Boolean(checkParentPermissions) && checkNodePermissionsForAdding(
    checkParentPermissions, 
    getTypeComponent(checkParentPermissions.path.slice(-1)[0])
  );
  if ((!checkDirectPermissions && checkParentPermissions) 
    || (conditionToAdd && parentConditionToAdd) 
    || (layerCount === 0 && !checkDirectPermissions)) {
    if (!nodeByComponent) {
      const nodeChild = createFsNode(
        componentByLayer,
        typeComponentByLayer,
        checkDirectPermissions?.allow || checkParentPermissions?.allow
      );
      currentLayerStructure.push(nodeChild);
    } else {
      newLayerCount += 1;
      if (nodeByComponent.type === 'directory') {
        nodeByComponent.children = Array.isArray(nodeByComponent.children) ? nodeByComponent.children : [];
      }
    }
    if (layerCount === components.length - 1) return currentLayerStructure;
    return iterateFileSystem(nodeByComponent
      ? nodeByComponent.children
      : currentLayerStructure, newLayerCount, components, permissions
    );
  }
  return currentLayerStructure;
};

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
    iterateFileSystem(structure, 0, fsSplitComponent, permissionsWithRelativePath);
  }
  return structure;
};