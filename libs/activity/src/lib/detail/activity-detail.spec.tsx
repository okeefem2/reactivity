import React from 'react';
import { render, cleanup } from '@testing-library/react';

import ActivityDetail from './activity-detail';

describe(' ActivityDetail', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(<ActivityDetail />);
    expect(baseElement).toBeTruthy();
  });
});
