import React from 'react';
import { render } from '@testing-library/react';

import TextAreaInput from './text-area-input';

describe(' TextAreaInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextAreaInput />);
    expect(baseElement).toBeTruthy();
  });
});
