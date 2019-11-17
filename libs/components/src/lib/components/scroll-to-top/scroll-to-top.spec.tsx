import React from 'react';
import { render } from '@testing-library/react';

import ScrollToTop from './scroll-to-top';

describe(' ScrollToTop', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ScrollToTop />);
    expect(baseElement).toBeTruthy();
  });
});
