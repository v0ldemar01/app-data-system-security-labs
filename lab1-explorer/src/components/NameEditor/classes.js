import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => createStyles({
  clearIcon: {
    margin: `0 ${theme.spacing(1)}px`,
    cursor: 'pointer'
  }
}));
