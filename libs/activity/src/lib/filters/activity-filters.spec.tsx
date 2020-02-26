import React from 'react';
import { render } from '@testing-library/react';

import ActivityFilters from './activity-filters';

describe(' ActivityFilters', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ActivityFilters />);
    expect(baseElement).toBeTruthy();
  });
});
