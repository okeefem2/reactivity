import React from 'react';
import { render } from '@testing-library/react';

import ActivityDetailChat from './activity-detail-chat';

describe(' ActivityDetailChat', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ActivityDetailChat />);
    expect(baseElement).toBeTruthy();
  });
});
