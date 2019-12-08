import { observable, computed, action, runInAction, reaction } from 'mobx';
import { createContext } from 'react';
import { User } from '@reactivity/model';
import { login, register, getCurrentUser } from '@reactivity/user-data-client';
import { loadingStore } from '@reactivity/loading-store';
import { routerHistory } from '@reactivity/common';

class UserStore {

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (!token) {
          window.localStorage.removeItem('jwt');
        } else {
          window.localStorage.setItem('jwt', token);
        }
      }
    );
  }
  @observable currentUser: User;
  @observable token: string;

  @computed get isLoggedIn(): boolean {
    return !!this.currentUser && !!this.currentUser.id;
  }

  @action getCurrentUser = async () => {
    loadingStore.toggleLoading(true, 'Checking credentials');
    try {
      const loggedInUser = await getCurrentUser();
      runInAction('Setting user', () => {
        console.log(loggedInUser);
        this.currentUser = loggedInUser;
        this.setToken(loggedInUser.access_token);
      });
    } catch (e) {
      console.log('Error fetching current user in', e);
    }
    loadingStore.toggleLoading(false);

  }

  @action login = async (user: User) => {
    loadingStore.toggleLoading(true, 'Logging In');

    try {
      const loggedInUser = await login(user);
      runInAction('Setting user', () => {
        console.log(loggedInUser);
        this.currentUser = loggedInUser;
        this.setToken(loggedInUser.access_token);
        routerHistory.push('/activities');
      });
    } catch (e) {
      console.log('Error logging in', e);
      loadingStore.toggleLoading(false);
      throw (e);
    }

    loadingStore.toggleLoading(false);

  }

  @action register = async (user: User) => {
    loadingStore.toggleLoading(true, 'Registering new user');
    try {
      const registeredUser = await register(user);
      runInAction('Setting user', () => {
        this.currentUser = registeredUser;
        this.setToken(registeredUser.access_token);
        routerHistory.push('/activities');
      });
    } catch (e) {
      console.log('Error logging in', e);
    }
    loadingStore.toggleLoading(false);
  }

  @action setToken = (token: string) => {
    this.token = token;
  }

  @action logout = () => {
    this.setToken(undefined);
    delete this.currentUser;
    routerHistory.push('/home');
  }
}

export const userContext = createContext(new UserStore());
