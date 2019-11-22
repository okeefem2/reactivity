import React from 'react';
import { render } from '@testing-library/react';

import SelectInput from './select-input';

describe(' SelectInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SelectInput />);
    expect(baseElement).toBeTruthy();
  });
});
