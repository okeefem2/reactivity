import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';

import './activity-form.scss';
import { Segment, Form, Loader } from 'semantic-ui-react';
import { Activity } from '@reactivity/common';
import { v4 as uuid } from 'uuid';
import { activityContext } from '@reactivity/activity-store';

type ActivityFormData = Activity | Partial<Activity>;
export interface ActivityFormProps {
  activity: ActivityFormData;
}

export const ActivityForm: React.FC<ActivityFormProps> =
  ({
    activity: initialFormState,
  }) => {
    const activityStore = useContext(activityContext);

    const initializeForm = (): ActivityFormData => {
      if (!initialFormState) {
        initialFormState = { title: '', description: '', category: '', date: new Date(), city: '', venue: '', };
      } else {
        initialFormState.date = new Date(initialFormState.date);
      }
      return initialFormState;
    }

    const [activity, setActivity] = useState<ActivityFormData>(initializeForm);

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.currentTarget;
      setActivity({ ...activity, [name]: value });
    }

    const handleSubmit = () => {

      if (typeof activity.date === 'object') {
        activity.date = activity.date.toISOString();
      }

      if (activity.id) {
        activityStore.updateActivity({ ...activity as Activity });
      } else {
        activity
        activityStore.saveNewActivity({ ...activity as Activity, id: uuid() });
      }
    }

    return (
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
            type='datetime-local'
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
              onClick={() => activityStore.cancelEdit()}>
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
    );
  };

export default ActivityForm;
