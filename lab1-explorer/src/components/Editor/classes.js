import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => createStyles({
  root: {},
  noCurrentFile: {
    fontWeight: 500,
    fontSize: 28,
    color: 'red'
  },
  formTextField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 12
    },
    '& .MuiOutlinedInput-input': {
      padding: 4.5
    },
    '& .MuiInputBase-input': {
      fontSize: theme.spacing(2.25)
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 16px) scale(1) !important',
      zIndex: 0
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75) !important',
      zIndex: 0
    }
  }
}));
