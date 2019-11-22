import React, { useState, FormEvent, useContext, useEffect } from 'react';

import './activity-form.scss';
import { Segment, Form, Grid } from 'semantic-ui-react';
import { Activity } from '@reactivity/common';
import { v4 as uuid } from 'uuid';
import { activityContext } from '@reactivity/activity-store';
import { RouteComponentProps } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Form as FinalForm, Field } from 'react-final-form';
import { TextInput, TextAreaInput, SelectInput, DateInput } from '@reactivity/components';
import { categories } from '../util/category';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';

type ActivityFormData = Activity | Partial<Activity>;
interface ActivityFormParams {
  id: string;
}

const validate = combineValidators({
  title: isRequired({ message: 'Event title is required' }),
  category: isRequired({ message: 'Event category is required' }),
  description: composeValidators(
    isRequired({ message: 'Event description is required' }),
    hasLengthGreaterThan(4)({
      message: 'Event description must be at least 5 characters'
    }),
  )(),
  city: isRequired({ message: 'Event city is required' }),
  venue: isRequired({ message: 'Event venue is required' }),
  date: isRequired({ message: 'Event date is required' }),
});

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

    const handleFinalSubmit = (formValue: Activity) => {
      console.log(formValue);
      let activityRequest: Promise<Activity>;

      if (activity.id) {
        activityRequest = activityStore.updateActivity({ ...formValue, id: activity.id });
      } else {
        activityRequest = activityStore.saveNewActivity({ ...formValue, id: uuid() });
      }

      activityRequest.then(a => {
        history.push(`/activity/${a.id}`);
      });
    }

    const renderForm = (
      { handleSubmit, form, submitting, pristine, values, invalid }: { handleSubmit: any; form: any; submitting: any; pristine: any; values: ActivityFormData; invalid; }
    ) => {
      return (
        <Form onSubmit={handleSubmit}>
          <Field
            name='title'
            placeholder='Title'
            value={values.title}
            component={TextInput}
          />
          <Field
            name='description'
            component={TextAreaInput}
            placeholder='Description'
            rows={3}
            value={values.description} />
          <Field
            component={SelectInput}
            options={categories}
            name='category'
            placeholder='Category'
            value={values.category} />
          <Form.Group widths="equal">
            <Field
              component={DateInput}
              name='date'
              placeholder='Date'
              date
              value={values.date} />
            <Field
              component={DateInput}
              name='date'
              placeholder='Time'
              time
              value={values.date} />
          </Form.Group>

          <Field
            component={TextInput}
            name='city'
            placeholder='City'
            value={values.city} />
          <Field
            component={TextInput}
            name='venue'
            placeholder='Venue'
            value={values.venue} />
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
              disabled={invalid || pristine}
              className="btn btn--pill btn--pill__primary"
            >
              Submit
            </button>
          </div>

        </Form>
      );
    }

    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <FinalForm
              onSubmit={handleFinalSubmit}
              render={renderForm}
              initialValues={activity}
              validate={validate}
            >
            </FinalForm>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  });

export default ActivityForm;
