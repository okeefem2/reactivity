import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Segment, Form, Grid, Label, Header } from 'semantic-ui-react';
import { User } from '@reactivity/model';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import { observer } from 'mobx-react-lite';
import { userContext } from '@reactivity/user-store';
import { RouteComponentProps } from 'react-router';
import { TextInput } from '@reactivity/components';

import './register.scss';
import { FORM_ERROR } from 'final-form';

/* eslint-disable-next-line */
export interface RegisterFormProps {
  onComplete: () => void;
}

const validate = combineValidators({
  username: isRequired({ message: 'Username is required' }),
  email: isRequired({ message: 'Email is required' }),
  password: composeValidators(
    isRequired({ message: 'Password is required' }),
    hasLengthGreaterThan(5)({
      message: 'Password must be at least 6 characters'
    }),
  )(),
});

export const RegisterComponent: React.FC<RegisterFormProps> =
  observer(({ onComplete }) => {

    const userStore = useContext(userContext);

    const handleSubmit = (formValue: User) => {
      return userStore.register(formValue).then(onComplete).catch(e => ({
        [FORM_ERROR]: e
      }));
    }

    const renderForm = (
      { handleSubmit, form, submitting, pristine, values, invalid, submitError, dirtySinceLastSubmit }:
        { handleSubmit: any; form: any; submitting: any; pristine: any; values: User; invalid; submitError; dirtySinceLastSubmit; }
    ) => {
      debugger;
      return (
        <Form onSubmit={handleSubmit}>
          <Header as='h2' content='Register!' color='teal' textAlign='center' />
          <Field
            name='username'
            placeholder='Username'
            value={values.username}
            component={TextInput}
          />
          <Field
            name='email'
            placeholder='Email'
            value={values.email}
            component={TextInput}
          />
          <Field
            name='password'
            component={TextInput}
            type='password'
            placeholder='Password'
            value={values.password} />
          {submitError && !dirtySinceLastSubmit && <Label color='red' basic content={submitError.statusText}></Label>}
          <button
            disabled={invalid && !dirtySinceLastSubmit || pristine}
            className="btn btn--pill btn--pill__primary btn--full-width"
          >
            Submit
            </button>
        </Form>
      );
    }
    return (

      <FinalForm
        onSubmit={handleSubmit}
        render={renderForm}
        initialValues={{ username: null, password: null }}
        validate={validate}
      >
      </FinalForm>
    );
  });
