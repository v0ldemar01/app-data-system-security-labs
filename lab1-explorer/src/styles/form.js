import { createStyles, makeStyles } from '@material-ui/core';

export const useFormStyles = makeStyles(theme => createStyles({
  formTextField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 8
    },
    '& .MuiOutlinedInput-input': {
      padding: 14
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
  },
  validationMessage: {
    fontSize: '0.75rem',
    fontWeight: 400,
    color: theme.palette.error.main,
    margin: '.25rem 0 0 1rem'
  },
  clearContainer: {
    padding: 0
  },
  clearSelectContainer: {
    marginRight: `${theme.spacing(0.5)}px !important`
  },
  clearIcon: {
    fontSize: `${theme.spacing(2.75)}px !important`,
    color: theme.palette.error.main
  },
  viewIcon: {
    fontSize: '1.25rem',
    color: theme.palette.error.main
  },
  button: {
    width: '50%',
    padding: theme.spacing(1.5, 5),
    borderRadius: 8,
    fontSize: theme.spacing(2.25),
    lineHeight: `${theme.spacing(3)}px`,
    fontWeight: 600,
    textTransform: 'none'
  },
  welcome: {
    fontSize: theme.spacing(1.625),
    fontWeight: 700,
    lineHeight: `${theme.spacing(2)}px`,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: theme.palette.text.secondary
  },
  mainCaption: {
    fontSize: theme.spacing(3.25),
    fontWeight: 700,
    lineHeight: `${theme.spacing(5.5)}px`,
    letterSpacing: -0.44
  },
  subTitle: {
    color: theme.palette.text.secondary,
    fontSize: theme.spacing(1.875),
    lineHeight: `${theme.spacing(3)}px`,
    letterSpacing: 0.25
  },
  passwordInput: {
    marginTop: theme.spacing(0.5)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
