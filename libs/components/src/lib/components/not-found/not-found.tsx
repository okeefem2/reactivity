import React, { useContext } from 'react';
import { Segment, Button, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { activityContext } from '@reactivity/activity-store';
import { observer } from 'mobx-react-lite';

export const NotFound = observer(() => {

  return (
    <Segment placeholder>
      <Header icon>
        <Icon name='search' />
        Oops - we've looked everywhere but couldn't find this.
            </Header>
      <Segment.Inline>
        <Button as={Link} to='/activities' primary>
          Return to Activities page
                </Button>
      </Segment.Inline>
    </Segment>
  );
});
