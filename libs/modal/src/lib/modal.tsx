import React, { useContext } from 'react';
import { Modal } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import './modal.scss';
import { modalContext } from './modal-store';

/* eslint-disable-next-line */
export interface ModalProps { }

export const ModalContainer = observer((props: ModalProps) => {
  const modalStore = useContext(modalContext);

  return modalStore.modal && (
    <Modal open={modalStore.modal.open} size='mini'>
      <Modal.Content>
        {/* <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>
          We've found the following gravatar image associated with your e-mail
          address.
        </p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description> */}
        {modalStore.modal.body}
      </Modal.Content>
    </Modal>
  );
});
