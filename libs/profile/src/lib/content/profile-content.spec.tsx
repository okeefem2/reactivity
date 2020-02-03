import React from 'react';
import { render } from '@testing-library/react';

import ProfileContent from './profile-content';

describe(' ProfileContent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileContent />);
    expect(baseElement).toBeTruthy();
  });
});
