import React from 'react';
import { render } from '@testing-library/react';

import ActivityDetailHeader from './activity-detail-header';

describe(' ActivityDetailHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ActivityDetailHeader />);
    expect(baseElement).toBeTruthy();
  });
});
