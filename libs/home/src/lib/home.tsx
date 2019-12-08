import React, { useContext } from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './home.scss';
import { userContext } from '@reactivity/user-store';
import { modalContext } from '@reactivity/modal';
import { LoginComponent, RegisterComponent } from '@reactivity/auth';

/* eslint-disable-next-line */
export interface HomeProps { }

export const Home = (props: HomeProps) => {

  const userStore = useContext(userContext);
  const modalStore = useContext(modalContext);

  const onCompleteAuthForm = () => {
    modalStore.closeModal();
  }

  return (
    <Segment inverted textAlign='center' vertical className='masthead' >
      <Container text>
        <Header as='h1' inverted>
          <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
          Reactivities
                </Header>
        {
          userStore.isLoggedIn ? <>
            <Header as='h2' inverted content={`Welcome ${userStore.currentUser.username}!`} />
            <Button as={Link} to='/activities' size='huge' inverted>
              Take me to the activities!
                </Button>
          </> : <>
              <Header as='h2' inverted content={`Welcome, Please Log in to begin!`} />
              <Button onClick={() => modalStore.openModal(<LoginComponent onComplete={onCompleteAuthForm} />)} size='huge' inverted>
                Log in!
                </Button>
              <Button onClick={() => modalStore.openModal(<RegisterComponent onComplete={onCompleteAuthForm} />)} size='huge' inverted>
                Register!
                </Button>
            </>
        }


      </Container>
    </Segment>
  );
};
