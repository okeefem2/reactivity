import React from 'react';
import { render } from '@testing-library/react';

import { ActivityListComponent } from './activity-list';

describe('ActivityListComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ActivityListComponent activities={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
