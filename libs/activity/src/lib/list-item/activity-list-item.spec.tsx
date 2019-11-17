import React from 'react';
import { render } from '@testing-library/react';

import ActivityListItem from './activity-list-item';

describe(' ActivityListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ActivityListItem />);
    expect(baseElement).toBeTruthy();
  });
});
