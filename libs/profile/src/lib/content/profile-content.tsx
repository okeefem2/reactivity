import React from 'react';

import './profile-content.scss';
import { Tab } from 'semantic-ui-react';
import ProfilePhotos from '../photos/profile-photos';

/* eslint-disable-next-line */
export interface ProfileContentProps { }

const panes = [
  {
    menuItem: 'About',
    render: () => <Tab.Pane>About content.</Tab.Pane>
  },
  {
    menuItem: 'Photos',
    render: () => <ProfilePhotos />
  },
  {
    menuItem: 'Activities',
    render: () => <Tab.Pane>Activities content.</Tab.Pane>
  },
  {
    menuItem: 'Followers',
    render: () => <Tab.Pane>Followers content.</Tab.Pane>
  },
  {
    menuItem: 'Following',
    render: () => <Tab.Pane>Following content.</Tab.Pane>
  },
];

export const ProfileContentComponent = (props: ProfileContentProps) => {
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
      activeIndex={1}
    />
  );
};
