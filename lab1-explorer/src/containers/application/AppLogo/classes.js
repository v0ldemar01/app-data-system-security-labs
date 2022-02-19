import { createStyles, makeStyles } from '@material-ui/core';
import AppLogo from 'assets/images/windows.png';

export const useStyles = makeStyles(() => createStyles({
  logo: {
    background: `url(${AppLogo}) center no-repeat fixed`,
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
    '&>div': {
      minHeight: '100vh'
    }
  }
}));
