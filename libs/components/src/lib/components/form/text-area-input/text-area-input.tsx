import React from 'react';

import './text-area-input.scss';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label } from 'semantic-ui-react';

/* eslint-disable-next-line */
export interface TextAreaInputProps
  extends FieldRenderProps<string, HTMLTextAreaElement>, FormFieldProps { }

export const TextAreaInput =
  ({ input, width, rows, type, placeholder, meta: { touched, error } }: TextAreaInputProps) => {
    console.log('textarea', input);
    return (
      <Form.Field error={touched && !!error}>
        <textarea {...input} placeholder={placeholder} rows={rows} />
        {touched && error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
      </Form.Field>
    );
  };

export default TextAreaInput;
