import React from 'react';
import { render } from '@testing-library/react';

import LyricalSong from './lyrical-song';

describe(' LyricalSong', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LyricalSong />);
    expect(baseElement).toBeTruthy();
  });
});
