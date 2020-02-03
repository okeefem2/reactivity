import React from 'react';
import { render } from '@testing-library/react';

import ProfilePhotos from './profile-photos';

describe(' ProfilePhotos', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfilePhotos />);
    expect(baseElement).toBeTruthy();
  });
});
