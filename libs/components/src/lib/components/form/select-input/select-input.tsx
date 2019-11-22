import React from 'react';

import './select-input.scss';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Select } from 'semantic-ui-react';

/* eslint-disable-next-line */
export interface SelectInputProps
  extends FieldRenderProps<string, HTMLSelectElement>, FormFieldProps {

}

export const SelectInput: React.FC<SelectInputProps> =
  ({ input, width, options, placeholder, meta: { touched, error } }: SelectInputProps) => {
    return (
      <Form.Field error={touched && !!error}>
        <Select
          value={input.value}
          onChange={(_e, d) => input.onChange(d.value)}
          placeholder={placeholder}
          options={options}
        />
        {touched && error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
      </Form.Field>
    );
  };

export default SelectInput;
