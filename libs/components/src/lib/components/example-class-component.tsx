import React, { Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Value } from '@reactivity/model';
import { List } from 'semantic-ui-react'

interface ExampleState {
  values: Value[];
}
export class ExampleClassComponent extends Component<{}, ExampleState> {
  readonly state: ExampleState = {
    values: [],
  };

  // Called immeditately after component is mounted
  // Normally I would make all api requests from the app and pass them to the library component
  // But for the example I will use this
  componentDidMount() {
    // .net
    axios.get<Value[]>('/dotnet/values').then((response: AxiosResponse<Value[]>) => {
      this.setState({
        values: [...this.state.values, ...response.data]
      });
    });
    // nestjs
    axios.get<Value[]>('/api/values').then((response: AxiosResponse<Value[]>) => {
      this.setState({
        values: [...this.state.values, ...response.data]
      });
    });

  }
  // Component gives us access to lifecycle methods and state
  render() {
    return (
      <List>
        {this.state.values.map((value: Value) => (
          <List.Item key={value.id}>{value.name}</List.Item>
        ))}
      </List>
    );
  }
}
