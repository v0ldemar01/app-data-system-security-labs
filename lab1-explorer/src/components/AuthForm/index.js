import React, { useCallback, useContext, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { initialValues, validationSchema } from './form';
import { convertFirstCharToUpper } from 'helpers/character.helper';
import { createDialog } from 'helpers/dialog.helper';
import { MyContext } from 'providers/MyProvider';
import clsx from 'clsx';
import Select, { components as Components } from 'react-select';
import makeAnimated from 'react-select/animated';
import { Box, Button, Grid, IconButton, TextField, Typography, useTheme } from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Clear as ClearIcon
} from '@material-ui/icons';

import { useFormStyles } from 'styles/form';
import { selectStyles } from 'styles/select';
import { userCredentialsConfig } from './config';

const roleOptions = ['admin', 'user']
  .map(value => ({
    label: convertFirstCharToUpper(value),
    value
  }));

const animatedComponents = makeAnimated();

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {onAuth} = useContext(MyContext);

  const commonFormClasses = useFormStyles();
  const theme = useTheme();

  const togglePasswordVisibility = useCallback(() => setShowPassword(prev => !prev), []);

  const handleAuth = useCallback(
    user => {
      const existingUser = userCredentialsConfig
        .find(({ role, password }) => role === user.role && password === user.password);
      if (!existingUser) {
        createDialog('Failed authorization into system', 'Incorrect password')
      }
      onAuth(existingUser);
    },
    []
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleAuth(values);
        setSubmitting(false);
      }}
    >
      {({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Box mb={2}>
            <Typography variant="h6">
              Welcome back. Please login into system
            </Typography>
          </Box>
          <Grid spacing={4} container>
            <Grid item xs={12} sm={12} md={12}>
              <Field
                placeholder="Select role..."
                isClearable
                component={Select}
                menuPlacement="bottom"
                onChange={value => setFieldValue('role', value?.value)}
                options={roleOptions}
                error={errors.role && touched.role}
                helperText={touched.role ? errors.role : ''}
                value={roleOptions.find(option => option.value === values.role)}
                noOptionsMessage={() => 'No role available'}
                components={{
                  ...animatedComponents,
                  ClearIndicator: clearIndicatorProps => (
                    <Components.ClearIndicator {...clearIndicatorProps}>
                      <IconButton className={
                        clsx(
                          commonFormClasses.clearContainer,
                          commonFormClasses.clearSelectContainer
                        )
                      }
                      >
                        <ClearIcon className={commonFormClasses.clearIcon} />
                      </IconButton>
                    </Components.ClearIndicator>
                  )
                }}
                styles={selectStyles(theme, !!errors.role && touched.role)}
              />
              {!!errors.role && touched.role && (
                <Box className={commonFormClasses.validationMessage}>{errors.role}</Box>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Field
                component={TextField}
                disabled={!roleOptions.find(option => option.value === values.role)}
                variant="outlined"
                onChange={handleChange}
                size="small"
                fullWidth
                autoFocus
                name="password"
                label="Password"
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="nope"
                error={errors.password && touched.password}
                helperText={touched.password ? errors.password : ''}
                value={values.password}
                className={commonFormClasses.formTextField}
                InputProps={{
                  endAdornment:
                    values.password && (
                      <IconButton
                        className={commonFormClasses.clearContainer}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    )
                }}
              />
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
