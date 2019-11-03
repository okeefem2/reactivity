import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react';

interface NavBarProps {
  setCreateActivity: (create: boolean) => void;
}
export const NavBarComponent =
  ({ setCreateActivity }) => {
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
            <Button positive content='Create Activity' onClick={() => setCreateActivity(true)} />
          </Menu.Item>
        </Container>

      </Menu>
    );
  }
