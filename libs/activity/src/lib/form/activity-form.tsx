import React, { useState, ChangeEvent, FormEvent } from 'react';

import './activity-form.scss';
import { Segment, Form, Loader } from 'semantic-ui-react';
import { Activity } from '@reactivity/common';
import { v4 as uuid } from 'uuid';

type ActivityFormData = Activity | Partial<Activity>;
export interface ActivityFormProps {
  activity: ActivityFormData;
  setEditActivity: (edit: boolean) => void;
  createActivity: (activity: Activity) => void;
  updateActivity: (activity: Activity) => void;
  submitting: boolean;
}

export const ActivityForm: React.FC<ActivityFormProps> =
  ({
    activity: initialFormState,
    setEditActivity,
    createActivity,
    updateActivity,
    submitting,
  }) => {

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
        updateActivity({ ...activity as Activity });
      } else {
        activity
        createActivity({ ...activity as Activity, id: uuid() });
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
              onClick={() => setEditActivity(false)}>
              Cancel
          </button>
            <button
              className="btn btn--pill btn--pill__primary"
            >
              Submit <Loader active={submitting} />
            </button>
          </div>

        </Form>
      </Segment>
    );
  };

export default ActivityForm;
