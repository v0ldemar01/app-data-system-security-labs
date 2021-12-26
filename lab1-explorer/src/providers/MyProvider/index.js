import { createContext } from 'react';

const contextDefaultValues = {
  onAuth: role => null
};

export const MyContext = createContext(
  contextDefaultValues
);
