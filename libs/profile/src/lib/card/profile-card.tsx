import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './profile-card.scss';
import { User } from '@reactivity/model';

/* eslint-disable-next-line */
export interface ProfileCardProps {
  profile: User;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <Card as={Link} to={`/profile/${profile.username}`}>
      <Image src={profile.image || '/assets/user.png'} />
      <Card.Content>
        <Card.Header>{profile.username}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Icon name='user' />
          {profile.followers} Followers
        </div>
      </Card.Content>
    </Card>
  );
};
