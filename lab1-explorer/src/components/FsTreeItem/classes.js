import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => createStyles({
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  }
}));