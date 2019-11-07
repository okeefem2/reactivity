import React from 'react';

import './loading.scss';
import { Dimmer, Loader } from 'semantic-ui-react';

/* eslint-disable-next-line */
export interface LoadingProps {
  inverted: boolean;
  content: string;
}

export const LoadingComponent: React.FC<LoadingProps> = ({ inverted = true, content }) => {
  return (
    <Dimmer active inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
};

export default LoadingComponent;
