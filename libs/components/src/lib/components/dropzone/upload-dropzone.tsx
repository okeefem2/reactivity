import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import './upload-dropzone.scss';
import { url } from 'inspector';
import { Icon, Header } from 'semantic-ui-react';

/* eslint-disable-next-line */
export interface UploadDropzoneProps {
  setFiles: (files: object[]) => void
}

const dropzoneStyles = {
  border: 'dashed 3px',
  borderColor: '#eee',
  borderRadius: '5px',
  paddingTop: '30px',
  textAlign: 'center' as 'center',
  height: '200px',
}

const dropzoneActiveStyles = {
  borderColor: 'green',
}

export const UploadDropzoneComponent = ({ setFiles }: UploadDropzoneProps) => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} style={
      isDragActive ? { ...dropzoneStyles, ...dropzoneActiveStyles } : dropzoneStyles
    }>
      <input {...getInputProps()} />
      <Icon name='upload' size='huge' />
      <Header content='Drop Image here'/>
      {/* {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      } */}
    </div>
  )
}
