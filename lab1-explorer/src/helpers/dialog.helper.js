const { dialog } = window.require('@electron/remote');

export const createErrorDialog = (message, detail) => dialog.showMessageBox({
  type: 'error',
  title: 'My app',
  message,
  detail
});

export const createSuccessDialog = (message, detail) => dialog.showMessageBox({
  type: 'info',
  title: 'My app',
  message,
  detail
});
