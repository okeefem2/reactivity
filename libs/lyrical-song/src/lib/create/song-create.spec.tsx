import React from 'react';
import { render } from '@testing-library/react';

import SongCreate from './song-create';

describe(' SongCreate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SongCreate />);
    expect(baseElement).toBeTruthy();
  });
});
