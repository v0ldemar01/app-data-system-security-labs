import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { Box, IconButton, TextField } from '@material-ui/core';
import { Clear as ClearIcon, Check as CheckIcon } from '@material-ui/icons';

import { useStyles } from './classes';
import { initializeValues, validationSchema } from './form';

const NameForm = ({
  value,
  name,
  onSubmitForm
}) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={initializeValues(name, value)}
      enableReinitialize
      validationSchema={validationSchema(name)}
      onSubmit={onSubmitForm}
    >
      {({
        values,
        errors,
        handleSubmit,
        setFieldValue
      }) => (
        <Form onSubmit={handleSubmit}>
          <Field
            component={TextField}
            variant="outlined"
            onChange={event => setFieldValue(name, event.target.value)}
            size="small"
            fullWidth
            name={name}
            id={name}
            autoFocus
            autoComplete={name}
            error={errors[name]}
            value={values[name]}
            className={classes.formTextField}
            InputProps={{
              endAdornment: (
                Boolean(values[name]) && (
                  <Box display="flex" mr={-1} ml={0.5}>
                    <IconButton
                      className={classes.iconContainer}
                      onClick={event => {
                        event.stopPropagation();
                        setFieldValue(name, '');
                      }}
                    >
                      <ClearIcon className={classes.icon} />
                    </IconButton>
                    <IconButton
                      type="submit"
                      className={classes.iconContainer}
                      onClick={event => event.stopPropagation()}
                    >
                      <CheckIcon className={classes.icon} />
                    </IconButton>
                  </Box>
                )
              )
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

NameForm.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSubmitForm: PropTypes.func.isRequired
};

export default NameForm;
