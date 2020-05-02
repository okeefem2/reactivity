import React from 'react';
import { render } from '@testing-library/react';

import SongList from './song-list';

describe(' SongList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SongList />);
    expect(baseElement).toBeTruthy();
  });
});
