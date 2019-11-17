import React from 'react';
import { render } from '@testing-library/react';

import ActivityDetailInfo from './activity-detail-info';

describe(' ActivityDetailInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ActivityDetailInfo />);
    expect(baseElement).toBeTruthy();
  });
});
