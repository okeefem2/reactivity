import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { FormFieldProps, Form, Label } from 'semantic-ui-react';
import { DateTimePicker } from 'react-widgets';

import './date-input.scss';

/* eslint-disable-next-line */
export interface DateInputProps
  extends FieldRenderProps<Date, HTMLInputElement>, FormFieldProps {
}

export const DateInput =
  ({ input, width, type, placeholder, date = false, time = false, meta: { touched, error }, ...rest }: DateInputProps) => {
    return (
      <Form.Field error={touched && !!error}>
        <DateTimePicker
          date={date}
          time={time}
          placeholder={placeholder}
          value={input.value || null}
          onChange={input.onChange}
          onKeyDown={(e) => e.preventDefault}
          onBlur={input.onBlur}
          {...rest}
        />
        {touched && error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
      </Form.Field>
    );
  };

export default DateInput;
