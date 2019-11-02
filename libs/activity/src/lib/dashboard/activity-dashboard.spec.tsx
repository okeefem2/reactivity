import React from 'react';
import { render } from '@testing-library/react';

import { ActivityDashboardComponent } from './activity-dashboard';

describe('ActivityDashboardComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ActivityDashboardComponent activities={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
