import React from 'react';
import { render } from '@testing-library/react';

import UploadDropzone from './upload-dropzone';

describe(' UploadDropzone', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UploadDropzone />);
    expect(baseElement).toBeTruthy();
  });
});
