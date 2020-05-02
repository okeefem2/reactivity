import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Song } from '@reactivity/model';

import './song-list.scss';
import { graphql } from 'graphql';

/* eslint-disable-next-line */
export interface SongListProps {}

export const songListQuery = gql`
  {
    songs { 
      id,
      title,
    }
  }
`;

export const SongList = (props: SongListProps) => {
  const { loading, data } = useQuery<{ songs: Song[]}>(
    songListQuery,
  );
  console.log(data);
  return (
    <div>
      <h1>Welcome to song-list component!</h1>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Song</th>
            </tr>
          </thead>
          <tbody>
            {data && data.songs.map(song => (
              <tr key={song.id}>
                <td>{song.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SongList;
