import React, { useContext, useState } from 'react';

import './profile-photos.scss';
import { Tab, Header, Card, Image, Button, Grid } from 'semantic-ui-react';
import { userContext } from '@reactivity/user-store';
import { UploadComponent } from '@reactivity/components';
/* eslint-disable-next-line */
export interface ProfilePhotosProps { }

export const ProfilePhotos = (props: ProfilePhotosProps) => {
  const userStore = useContext(userContext);
  const profile = userStore.userProfile;

  const readOnly = !userStore.isProfileCurrentUser;
  const [addMode, setAddMode] = useState(true);
  console.log(profile);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width='16' style={{ paddingBottom: 0 }}>
          <Header floated='left' icon='image' content='Photos' />
          {
            !readOnly &&
            <Button floated='right'
              basic
              content={addMode ? 'Cancel' : 'Add Photo '}
              onClick={() => setAddMode(!addMode)}
            />
          }
        </Grid.Column>
        <Grid.Column width='16'>
          {
            addMode ?
              <UploadComponent /> :
              <Card.Group itemsPerRow={5}>
                {profile && profile.photos && profile.photos.map((photo) => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {
                      !readOnly && !photo.isMain &&
                      <Button.Group fluid widths={2}>
                        <Button basic positive content={'Main'} onClick={() => userStore.setMainPhoto(photo.id)}></Button>
                        <Button basic negative icon='trash' onClick={() => userStore.deletePhoto(photo.id)}></Button>
                      </Button.Group>
                    }
                  </Card>
                ))}
              </Card.Group>
          }

        </Grid.Column>
      </Grid>

    </Tab.Pane>
  );
};

export default ProfilePhotos;
