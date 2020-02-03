import React, { useContext } from 'react'
import { Menu, Container, Button, Dropdown, Image } from 'semantic-ui-react';
import { activityContext } from '@reactivity/activity-store';
import { NavLink, Link } from 'react-router-dom';
import { userContext } from '@reactivity/user-store';
import { observer } from 'mobx-react-lite';

export const NavBarComponent =
  observer(() => {
    const activityStore = useContext(activityContext);
    const userStore = useContext(userContext);

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
          {
            userStore.currentUser &&
            <Menu.Item position='right'>
              <Image avatar spaced='right' src={userStore.currentUser.image || '/assets/user.png'} />
              <Dropdown pointing='top left' text={userStore.currentUser.username}>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/profile/${userStore.currentUser.username}`} text='My profile' icon='user' />
                  <Dropdown.Item onClick={() => userStore.logout()} text='Logout' icon='power' />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          }
        </Container>

      </Menu>
    );
  });
