import React from 'react';
import { render } from '@testing-library/react';

import ActivityPlaceholder from './activity-placeholder';

describe(' ActivityPlaceholder', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ActivityPlaceholder />);
    expect(baseElement).toBeTruthy();
  });
});
