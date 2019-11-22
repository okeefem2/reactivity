import React from 'react';
import { render } from '@testing-library/react';

import DateInput from './date-input';

describe(' DateInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DateInput />);
    expect(baseElement).toBeTruthy();
  });
});
