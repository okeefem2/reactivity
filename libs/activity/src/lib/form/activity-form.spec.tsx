import React from 'react';
import { render, cleanup } from '@testing-library/react';

import ActivityForm from './activity-form';

describe(' ActivityForm', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(<ActivityForm />);
    expect(baseElement).toBeTruthy();
  });
});
