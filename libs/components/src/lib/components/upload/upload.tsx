import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Header, Grid, Image, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { UploadDropzoneComponent } from '../dropzone/upload-dropzone';
import { UploadCropperComponent } from '../cropper/upload-cropper';
import { userContext } from '@reactivity/user-store';
// TODO in real life would have the uploads components in their own lib
export const UploadComponent = observer(() => {

  const [files, setFiles] = useState([]);
  const [image, setImage] = useState<Blob>();

  const userStore = useContext(userContext);


  useEffect(() => {
    return () => {
      // prevent file memory leak
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [])
  return (
    <Fragment>
      <Grid>
        <Grid.Row />
        <Grid.Column width={4}>
          <Header color='teal' sub content='Step 1 - Add Photo' />
          <UploadDropzoneComponent setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 2 - Resize image' />
          {
            !!files.length &&
            <UploadCropperComponent setImage={setImage} imagePreview={files[0].preview} />
          }
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 3 - Preview & Upload' />
          {
            // files.length > 0 && <Image src={files[0].preview} />
            files.length > 0 &&
            <div
              className='img-preview'
              style={{ minHeight: '200px', overflow: 'hidden' }}
            >
            </div>
          }
          {
            !!image &&
            <Button
              onClick={() => userStore.uploadPhoto(image)}
              content='Upload'
              labelPosition='left'
              icon='upload'
              primary
            />
          }
        </Grid.Column>
      </Grid>
    </Fragment>
  );
});
