import React from 'react';

import './activity-list-item-attendees.scss';
import { List, Image, Popup } from 'semantic-ui-react';
import { UserActivity } from 'libs/model/src/lib/user-activity';

/* eslint-disable-next-line */
export interface ActivityListItemAttendeesProps {
  attendees: UserActivity[];
}

const styles = {
  borderColor: 'orange',
  borderWidth: 2,
}

export const ActivityListItemAttendees = (
  { attendees }: ActivityListItemAttendeesProps
) => {
  return attendees ? (
    <List horizontal>
      {attendees.map((attendee) => (
        !!attendee.user ?
          <List.Item key={attendee.user.username}>
            <Popup
              header={attendee.user.username}
              trigger={
                <Image size='mini'
                  circular
                  src={attendee.user.image || '/assets/user.png'}
                  bordered
                  style={attendee.user.isFollowed ? styles : null}
                />
              }
            />
          </List.Item> : <></>
      ))}
    </List>
  ) : <div></div>;
};

export default ActivityListItemAttendees;
