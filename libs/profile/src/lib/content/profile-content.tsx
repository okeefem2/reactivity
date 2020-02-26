import React from 'react';

import './profile-content.scss';
import { Tab } from 'semantic-ui-react';
import ProfilePhotos from '../photos/profile-photos';
import { ProfileFollowings } from '../followings/profile-followings';

/* eslint-disable-next-line */
export interface ProfileContentProps {
  setActiveProfileTab: (index) => void;
}

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
    render: () => <ProfileFollowings></ProfileFollowings>
  },
  {
    menuItem: 'Following',
    render: () => <ProfileFollowings></ProfileFollowings>
  },
];

export const ProfileContentComponent = ({ setActiveProfileTab }) => {
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
      onTabChange={(_e, data) => setActiveProfileTab(data.activeIndex)}
    />
  );
};
