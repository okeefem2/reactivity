import { observable, action, configure } from 'mobx';
import { createContext } from 'react';

// ensures that state can only be modified in an action
configure({ enforceActions: 'always' });
class LoadingStore {
  @observable loading = false;
  @observable loadingMessage: string;

  @action toggleLoading = (loading: boolean, message = 'Loading') => {
    this.loadingMessage = !loading ? undefined : message;
    this.loading = loading;
    console.log('Loading!', this.loading);
  }
}

export const loadingStore = new LoadingStore();
export const loadingContext = createContext(loadingStore);
