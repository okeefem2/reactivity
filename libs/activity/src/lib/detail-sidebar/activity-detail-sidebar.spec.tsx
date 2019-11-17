import React from 'react';
import { render } from '@testing-library/react';

import ActivityDetailSidebar from './activity-detail-sidebar';

describe(' ActivityDetailSidebar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ActivityDetailSidebar />);
    expect(baseElement).toBeTruthy();
  });
});
