import React from 'react';
import { Segment, Item, Header, Button, Grid, Statistic, Divider, Reveal } from 'semantic-ui-react';
import { User } from '@reactivity/model';


interface ProfileHeaderProps {
  profile: User;
  follow: (username) => Promise<void>;
  unfollow: (username) => Promise<void>;
  isCurrentUser: boolean;
}

export const ProfileHeaderComponent: React.FC<ProfileHeaderProps> =
  ({ profile, follow, unfollow, isCurrentUser }) => {
    return (
      profile ?
        <Segment>
          <Grid>
            <Grid.Column width={12}>
              <Item.Group>
                <Item>
                  <Item.Image
                    avatar
                    size='small'
                    src={(profile && profile.image) || '/assets/user.png'}
                  />
                  <Item.Content verticalAlign='middle'>
                    <Header as='h1'>{profile && profile.username}</Header>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Grid.Column>
            <Grid.Column width={4}>
              <Statistic.Group widths={2}>
                <Statistic label='Followers' value={profile.followers} />
                <Statistic label='Following' value={profile.following} />
              </Statistic.Group>
              <Divider />
              <Reveal animated='move'>
                <Reveal.Content visible style={{ width: '100%' }}>
                  <Button
                    fluid
                    color='teal'
                    content='Following'
                  />
                </Reveal.Content>
                <Reveal.Content hidden>
                  <Button
                    fluid
                    basic
                    color={true ? 'red' : 'green'}
                    content={true ? 'Unfollow' : 'Follow'}
                  />
                </Reveal.Content>
              </Reveal>
            </Grid.Column>
          </Grid>
        </Segment> : <></>
    );
  };
