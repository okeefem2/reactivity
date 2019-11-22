import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import './text-input.scss';
import { FormFieldProps, Form, Label } from 'semantic-ui-react';

/* eslint-disable-next-line */
export interface TextInputProps extends FieldRenderProps<string, HTMLInputElement>, FormFieldProps {

}

export const TextInput: React.FC<TextInputProps> =
  ({ input, width, type, placeholder, meta: { touched, error } }: TextInputProps) => {
    return (
      <Form.Field error={touched && !!error}>
        <input type="text" {...input} placeholder={placeholder} />
        {touched && error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
      </Form.Field>
    );
  };

export default TextInput;
