import React, { useContext } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react';
import { activityContext } from '@reactivity/activity-store';
import { NavLink } from 'react-router-dom';

export const NavBarComponent =
  () => {
    const activityStore = useContext(activityContext);

    return (
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as={NavLink} exact to='/'
            name='Home'>
            <img src="/assets/logo.png" alt="logo" className="mr10" />
          </Menu.Item>
          <Menu.Item as={NavLink} to='/activities'
            name='Activites'
          />
          <Menu.Item
            name='Create Activity'>
            <Button positive
              content='Create Activity'
              onClick={() => activityStore.createActivity()}
              as={NavLink} to='/create-activity'
            />
          </Menu.Item>
        </Container>

      </Menu>
    );
  }
