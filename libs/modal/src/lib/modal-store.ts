import { observable, action, configure } from 'mobx';
import { createContext } from 'react';

export interface ModalData {
  open: boolean;
  body: any;
}
// ensures that state can only be modified in an action
configure({ enforceActions: 'always' });
class ModalStore {
  @observable.shallow modal: ModalData = { // use shallow to be able to pass a component
    open: false,
    body: undefined
  };

  @action openModal = (content: any) => {
    this.modal = {
      open: true,
      body: content,
    }
  }

  @action closeModal = () => {
    this.modal = {
      open: false,
      body: undefined,
    }
  }
}

export const modalStore = new ModalStore();
export const modalContext = createContext(modalStore);
