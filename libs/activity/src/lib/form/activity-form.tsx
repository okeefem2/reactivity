import React, { useState } from 'react';

import './activity-form.scss';
import { Segment, Form } from 'semantic-ui-react';
import { Activity } from '@reactivity/common';

type ActivityFormData = Activity | Partial<Activity>;
export interface ActivityFormProps {
  activity: ActivityFormData;
  setEditActivity: (edit: boolean) => void;
}

export const ActivityForm: React.FC<ActivityFormProps> = ({ activity: initialFormState, setEditActivity }) => {

  const initializeForm = (): ActivityFormData => {
    if (!initialFormState) {
      initialFormState = { title: '', description: '', category: '', date: new Date(), city: '', venue: '', };
    }
    return initialFormState;
  }

  const [activity, setActivity] = useState<ActivityFormData>(initializeForm);

  return (
    <Segment>
      <Form>
        <Form.Input placeholder='Title' />
        <Form.TextArea rows={2} placeholder='Description' />
        <Form.Input placeholder='Category' />
        <Form.Input type='date' placeholder='Date' />
        <Form.Input placeholder='City' />
        <Form.Input placeholder='Venue' />
        <div className="activity-form__btn-group">
          <button
            className="btn btn--pill btn--pill__grey mr10"
            onClick={() => setEditActivity(false)}>
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
