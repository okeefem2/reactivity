import React, { useContext, useEffect } from 'react';
import { Tab, Grid, Header, Card } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

import './profile-followings.scss';
import { userContext } from '@reactivity/user-store';
import { ProfileCard } from '../card/profile-card';

/* eslint-disable-next-line */
export interface ProfileFollowingsProps { }


export const ProfileFollowings = observer(() => {
  const userStore = useContext(userContext);
  const profile = userStore.userProfile;
  const followings = userStore.followings;
  // useEffect(() => {
  //   profile && userStore.loadFollowings(profile.username, 'following');
  // }, [profile]);

  return (
    profile && followings ?
      <Tab.Pane>
        <Grid>
          <Grid.Column width={16}>
            <Header
              floated='left'
              icon='user'
              content={
                userStore.activeProfileTab === 3
                  ? `People following ${profile!.username}`
                  : `People ${profile!.username} is following`
              }
            />
          </Grid.Column>
          <Grid.Column width={16}>
            <Card.Group itemsPerRow={5}>
              {followings.map(f => (
                <ProfileCard key={f.username} profile={f} />
              ))}
            </Card.Group>
          </Grid.Column>
        </Grid>
      </Tab.Pane> : <></>
  );
});
