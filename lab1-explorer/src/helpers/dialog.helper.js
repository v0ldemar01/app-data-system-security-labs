const { dialog } = window.require('@electron/remote');

export const createDialog = (message, detail) => dialog.showMessageBox({
  type: 'error',
  title: 'Error',
  message,
  detail
});