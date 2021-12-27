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

const nestIterateFs = (currentLayerStructure, layerCount, components) => {
  let newLayerCount = layerCount;
  const nodeByComponent = currentLayerStructure.find(({ name }) => name === components[layerCount]);
  if (!nodeByComponent) {
    const nodeChild = createFsNode(components[layerCount]);
    currentLayerStructure.push(nodeChild);
  } else {
    newLayerCount += 1;
    if (nodeByComponent.type === 'directory') {
      nodeByComponent.children = Array.isArray(nodeByComponent.children) ? nodeByComponent.children : [];
    }
  }
  if (layerCount === components.length - 1) return currentLayerStructure;
  return nestIterateFs(nodeByComponent ? nodeByComponent.children : currentLayerStructure, newLayerCount, components)
}

const createFsNode = name => {
  const type = path.parse(name).ext ? 'file' : 'directory';
  const node = {
    id: v4(),
    name,
    type
  };
  return node;
};

export const createFsStructure = async () => {
  const structure = [];
  const dir = path.join(process.cwd(), 'fileSystem');
  const fsComponents = [];
  for await (const fsComponent of walkAsync(dir)) {
    fsComponents.push(path.relative(process.cwd(), fsComponent).split(path.sep));
  }
  for (const fsComponent of fsComponents) {
    nestIterateFs(structure, 0, fsComponent);
  }
  return structure;
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