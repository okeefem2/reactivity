import React, { Fragment } from 'react';
import { SongList, SongCreate } from '@reactivity/lyrical-song';
import './app.scss';
import { Route, Link } from 'react-router-dom';

export const App = () => {
  return (
    <Fragment>
      <Route exact path="/">
        <SongList></SongList>
      </Route>
      <Route path="/create" component={SongCreate}/>
      <Link to='/create'>Create Song</Link>
    </Fragment>
    );
};

export default App;
