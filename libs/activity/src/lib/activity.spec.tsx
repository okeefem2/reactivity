import React from 'react';
import { render } from '@testing-library/react';

import { ActivityComponent } from './activity';

describe('ActivityListComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ActivityComponent />);
    expect(baseElement).toBeTruthy();
  });
});
