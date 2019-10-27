import React, { Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Value } from '@reactivity/common';
import { List } from 'semantic-ui-react'

export class ExampleClassComponent extends Component {
  state = {
    values: [],
  };

  // Called immeditately after component is mounted
  // Normally I would make all api requests from the app and pass them to the library component
  // But for the example I will use this
  componentDidMount() {
    // .net
    axios.get('/dotnet/values').then((response: AxiosResponse<Value[]>) => {
      this.setState({
        values: [...this.state.values, ...response.data]
      });
    });
    // nestjs
    axios.get('/api/values').then((response: AxiosResponse<Value[]>) => {
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
