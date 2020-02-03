import React from 'react';
import { render } from '@testing-library/react';

import UploadCropper from './upload-cropper';

describe(' UploadCropper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UploadCropper />);
    expect(baseElement).toBeTruthy();
  });
});
