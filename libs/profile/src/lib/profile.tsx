import React, { useContext, useEffect } from 'react';

import './profile.scss';
import { Grid } from 'semantic-ui-react';
import { ProfileHeaderComponent } from './header/profile-header';
import { ProfileContentComponent } from './content/profile-content';
import { userContext } from '@reactivity/user-store';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';

/* eslint-disable-next-line */
export interface ProfileProps { }
interface ProfileParams {
  username: string;
}

export const ProfileComponent: React.FC<RouteComponentProps<ProfileParams>> =
  observer(({ match, history }) => {
    const userStore = useContext(userContext);

    useEffect(() => {
      userStore.getProfile(match.params.username);
    }, [match.params.username]);

    return (
      <Grid>
        <Grid.Column width={16}>
          <ProfileHeaderComponent
            profile={userStore.userProfile}
            follow={userStore.follow}
            unfollow={userStore.unfollow}
            isCurrentUser={userStore.isProfileCurrentUser}
          >
          </ProfileHeaderComponent>
          <ProfileContentComponent setActiveProfileTab={userStore.setActiveProfileTab}></ProfileContentComponent>
        </Grid.Column>
      </Grid>
    );
  });
