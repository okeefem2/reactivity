import React, { FormEvent } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router';

import './song-create.scss';
import { Song } from '@reactivity/model';
import { useFormState } from '@reactivity/common';
import { songListQuery } from '../list/song-list';

const ADD_SONG = gql`
  mutation addSong($song: SongInput!) {
    addSong(song: $song) {
      id
      title
      # lyrics
    }
  }
`;
export const SongCreate: React.FC<RouteComponentProps> = ({ history }) => {

  const [formValue, handleInputChange, addItem, removeItem] = useFormState<{ title: string }>({
    title: '',
    // lyrics: []
  });
  const navToSongList = (data: Song) => history.push('/');

  const [addSong, { data }] = useMutation(
    ADD_SONG,
    { onCompleted: navToSongList, refetchQueries: [ { query: songListQuery } ] }
  );


  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addSong({variables: { song: formValue } });
  };

  return (
    <div>
      <h3>Create A New Song</h3>
      <form onSubmit={handleSubmit}>
      <label htmlFor="title">Song Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formValue?.title}
          onChange={handleInputChange} />
        {/* <div>
          {
            formValue?.lyrics.map((lyric, i) => (
              <div key={i}>
                <label htmlFor={`lyric-${i}`}>Lyric {i}</label>
                <input

                  id={`lyric-${i}`}
                  type="text"
                  name="lyrics"
                  data-index={i}
                  value={lyric}
                  onChange={handleInputChange}
                  />
                  <button onClick={() => removeItem('lyrics', i)} type="button">Remove Lyric</button>
              </div>
            ))
          }
          <button onClick={() => addItem('lyrics', '')} type="button">Add Lyric</button>
        </div> */}
      </form>
    </div>
  );
};

export default SongCreate;
