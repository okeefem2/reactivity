import React from 'react';
import { render } from '@testing-library/react';

import ProfileHeader from './profile-header';

describe(' ProfileHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileHeader />);
    expect(baseElement).toBeTruthy();
  });
});
