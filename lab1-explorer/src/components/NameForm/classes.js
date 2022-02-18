import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => createStyles({
  formTextField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2
    },
    '& .MuiOutlinedInput-input': {
      paddingTop: 4,
      paddingBottom: 4
    },
    '& .MuiInputBase-input': {
      fontSize: theme.spacing(2)
    },
  },
  iconContainer: {
    padding: '0 !important'
  },
  icon: {
    fontSize: `${theme.spacing(2.75)}px !important`    
  },
  clearIcon: {
    color: `${theme.palette.error.main} !important`
  },
  submitIcon: {
    color: `${theme.palette.success.main} !important`
  }
}));
