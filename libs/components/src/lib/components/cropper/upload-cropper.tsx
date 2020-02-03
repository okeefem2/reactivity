import React, { useRef } from 'react';
import Cropper from 'react-cropper';

import './upload-cropper.scss';
import 'cropperjs/dist/cropper.css';

/* eslint-disable-next-line */
export interface UploadCropperProps {
  imagePreview: string;
  setImage: (file: Blob) => void;
}

export const UploadCropperComponent = ({ setImage, imagePreview }: UploadCropperProps) => {
  const cropper = useRef<Cropper>(undefined);
  const cropImage = () => {
    if (cropper.current && typeof cropper.current.getCroppedCanvas() === 'undefined') {
      return;
    }
    cropper && cropper.current &&
      cropper.current.getCroppedCanvas().toBlob(blob => setImage(blob), 'image/jpeg');
  }
  return (
    <Cropper
      ref={cropper}
      src={imagePreview}
      style={{ height: 200, width: '100%' }}
      // Cropper.js options
      aspectRatio={1 / 1}
      dragMode='move'
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      guides={false}
      viewMode={1}
      preview='.img-preview'
      crop={cropImage} />
  );
};
