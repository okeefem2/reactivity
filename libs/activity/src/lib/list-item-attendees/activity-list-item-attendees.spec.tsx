import React from 'react';
import { render } from '@testing-library/react';

import ActivityListItemAttendees from './activity-list-item-attendees';

describe(' ActivityListItemAttendees', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ActivityListItemAttendees />);
    expect(baseElement).toBeTruthy();
  });
});
