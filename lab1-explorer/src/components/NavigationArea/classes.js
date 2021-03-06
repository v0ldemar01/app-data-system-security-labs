import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => createStyles({
  paper: {
    borderRadius: '0 24px 24px 0 !important',
    backgroundColor: '#fff !important',
    opacity: '1 !important',
    padding: 7.5
  },
  editorIcon: {
    marginRight: theme.spacing(1)
  },

  iconContainer: {
    padding: '0 !important'
  }
}));
