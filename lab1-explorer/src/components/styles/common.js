import { createStyles, makeStyles } from '@material-ui/core';

export const useCommonStyles = makeStyles(() => createStyles({
  paper: {
    width: '100%',
    borderRadius: 24,
    background: '#67e1ff',
    opacity: 0.75,
    border: '3px solid #000f9c'
  }
}));
