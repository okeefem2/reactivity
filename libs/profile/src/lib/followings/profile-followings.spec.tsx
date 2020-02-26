import React from 'react';
import { render } from '@testing-library/react';

import ProfileFollowings from './profile-followings';

describe(' ProfileFollowings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileFollowings />);
    expect(baseElement).toBeTruthy();
  });
});
