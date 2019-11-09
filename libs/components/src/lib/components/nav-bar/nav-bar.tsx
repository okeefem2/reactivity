import React, { useContext } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react';
import { activityContext } from '@reactivity/activity-store';

export const NavBarComponent =
  () => {
    const activityStore = useContext(activityContext);

    return (
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item
            name='Home'>
            <img src="/assets/logo.png" alt="logo" className="mr10" />
          </Menu.Item>
          <Menu.Item
            name='Activites'
          />
          <Menu.Item
            name='Create Activity'>
            <Button positive content='Create Activity' onClick={() => activityStore.createActivity()} />
          </Menu.Item>
        </Container>

      </Menu>
    );
  }
