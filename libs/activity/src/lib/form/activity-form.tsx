import React, { useState, FormEvent, useContext, useEffect } from 'react';

import './activity-form.scss';
import { Segment, Form, Grid } from 'semantic-ui-react';
import { Activity } from '@reactivity/common';
import { v4 as uuid } from 'uuid';
import { activityContext } from '@reactivity/activity-store';
import { RouteComponentProps } from 'react-router';
import { observer } from 'mobx-react-lite';

type ActivityFormData = Activity | Partial<Activity>;
interface ActivityFormParams {
  id: string;
}

export const ActivityForm: React.FC<RouteComponentProps<ActivityFormParams>> =
  observer(({ match, history }) => {
    const activityStore = useContext(activityContext);
    const [activity, setActivity] = useState<ActivityFormData>({ title: '', description: '', category: '', date: new Date(), city: '', venue: '', });

    useEffect(() => {
      if (match.params.id) {
        activityStore.loadActivity(match.params.id).then(() => {
          setActivity(activityStore.activity);
        });
      }

      return activityStore.clearSelectedActivity;
    }, []);


    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.currentTarget;
      setActivity({ ...activity, [name]: value });
    }

    const handleSubmit = () => {

      let activityRequest: Promise<Activity>;

      if (activity.id) {
        activityRequest = activityStore.updateActivity({ ...activity as Activity });
      } else {
        activityRequest = activityStore.saveNewActivity({ ...activity as Activity, id: uuid() });
      }

      activityRequest.then(a => {
        history.push(`/activity/${a.id}`);
      })
    }

    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Form onSubmit={handleSubmit}>
              <Form.Input
                onChange={handleInputChange}
                name='title'
                placeholder='Title'
                value={activity.title} />
              <Form.TextArea
                name='description'
                onChange={handleInputChange}
                rows={2}
                placeholder='Description'
                value={activity.description} />
              <Form.Input
                onChange={handleInputChange}
                name='category'
                placeholder='Category'
                value={activity.category} />
              <Form.Input
                onChange={handleInputChange}
                name='date'
                type='date'
                placeholder='Date'
                value={activity.date} />
              <Form.Input
                onChange={handleInputChange}
                name='city'
                placeholder='City'
                value={activity.city} />
              <Form.Input
                onChange={handleInputChange}
                name='venue'
                placeholder='Venue'
                value={activity.venue} />
              <div className="activity-form__btn-group">
                <button
                  className="btn btn--pill btn--pill__grey mr10"
                  onClick={() => {
                    // if Id, then go back to detail
                    if (match.params.id) {
                      history.push(`/activity/${match.params.id}`);
                    } else {
                      history.push(`/activities`);
                    }

                    // Otherwise go back to the list
                  }}>
                  Cancel
          </button>
                <button
                  className="btn btn--pill btn--pill__primary"
                >
                  Submit
            </button>
              </div>

            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  });

export default ActivityForm;
