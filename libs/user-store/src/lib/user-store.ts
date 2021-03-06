import { observable, computed, action, runInAction, reaction } from 'mobx';
import { createContext } from 'react';
import { User } from '@reactivity/model';
import { login, register, getCurrentUser, getProfile, uploadProfilePhoto, deleteProfilePhoto, setMainProfilePhoto, unfollow, follow, getList } from '@reactivity/user-data-client';
import { loadingStore } from '@reactivity/loading-store';
import { routerHistory } from '@reactivity/common';

// Note I combined user profile store with auth store
// Not ideal, but I am practicing the stack, tools and apis, not full architecture!
class UserStore {

  constructor() {
    // Runs when the token changes reference
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

    reaction(
      () => this.activeProfileTab,
      activeProfileTab => {
        if (activeProfileTab === 3 || activeProfileTab === 4) {
          const predicate = activeProfileTab === 3 ? 'followers' : 'following';
          this.loadFollowings(this.userProfile.username, predicate);
        } else {
          this.followings = [];
        }
      }
    );
  }
  @observable currentUser: User;
  @observable followings: User[] = [];
  @observable userProfile: User;
  @observable token: string;
  @observable activeProfileTab = 0;
  @observable initialUserCheck: boolean;

  @computed get isLoggedIn(): boolean {
    return !!this.currentUser && !!this.currentUser.id;
  }

  @computed get isProfileCurrentUser(): boolean {
    return this.isLoggedIn &&
      !!this.userProfile &&
      this.currentUser.username === this.userProfile.username;
  }

  @action setActiveProfileTab = (index) => {
    this.activeProfileTab = index;
  }

  @action loadFollowings = async (username: string, predicate: 'followers' | 'following') => {
    loadingStore.toggleLoading(true, `Fetching ${predicate}`);
    try {
      const followings = await getList(username, predicate);
      runInAction('Set followings', () => {
        console.log(followings);
        this.followings = followings;
      });
    } catch (e) {
      console.log('Error following', e);
    }
    loadingStore.toggleLoading(false);
  }

  @action follow = async (username: string) => {
    loadingStore.toggleLoading(true, 'Following user');
    try {
      const userProfile = await follow(username);
      runInAction('Follow', () => {
        console.log(userProfile);
        this.userProfile!.isFollowed = true;
        this.userProfile!.followers++;
        this.currentUser!.following++;
      });
    } catch (e) {
      console.log('Error following', e);
    }
    loadingStore.toggleLoading(false);
  }

  @action unfollow = async (username: string) => {
    loadingStore.toggleLoading(true, 'unfollowing user');
    try {
      const userProfile = await unfollow(username);
      runInAction('Unfollow', () => {
        console.log(userProfile);
        this.userProfile!.isFollowed = false;
        this.userProfile!.followers--;
        this.currentUser!.following--;
      });
    } catch (e) {
      console.log('Error unfollowing', e);
    }
    loadingStore.toggleLoading(false);
  }

  @action getProfile = async (username: string) => {
    loadingStore.toggleLoading(true, 'Fetching User Profile');
    try {
      const userProfile = await getProfile(username);
      runInAction('Setting user profile', () => {
        console.log(userProfile);
        this.userProfile = userProfile;
      });
    } catch (e) {
      console.log('Error fetching user profile', e);
    }
    loadingStore.toggleLoading(false);
  }

  @action getCurrentUser = async (initialCheck = false) => {
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

  @action uploadPhoto = async (photo: Blob) => {
    loadingStore.toggleLoading(true, 'Uploading photo');
    try {
      const uploadedPhoto = await uploadProfilePhoto(photo);
      runInAction('Setting profile photo', () => {
        if (this.userProfile) {
          this.userProfile.photos.push(uploadedPhoto);
          if (uploadedPhoto.isMain && this.currentUser) {
            this.currentUser.image = uploadedPhoto.url;
            this.userProfile.image = uploadedPhoto.url;
          }
        }
      });
    } catch (e) {
      console.log('Error uploading photo', e);
    }
    loadingStore.toggleLoading(false);
  }

  @action setMainPhoto = async (photoId: string) => {
    loadingStore.toggleLoading(true, 'Setting main photo');
    try {
      const photo = await setMainProfilePhoto(photoId);
      runInAction('Setting main profile photo', () => {
        if (this.userProfile) {
          this.userProfile.photos = this.userProfile.photos.map(p => ({ ...p, isMain: p.id === photoId }));
          this.currentUser.image = photo.url;
          this.userProfile.image = photo.url;
        }
      });
    } catch (e) {
      console.log('Error setting main photo', e);
    }
    loadingStore.toggleLoading(false);
  }

  @action deletePhoto = async (photoId: string) => {
    loadingStore.toggleLoading(true, 'Uploading photo');
    try {
      await deleteProfilePhoto(photoId);
      runInAction('Removing profile photo', () => {
        if (this.userProfile) {
          this.userProfile.photos = this.userProfile.photos.filter(p => p.id !== photoId);
          // Can't delete main photo so we are good there
        }
      });
    } catch (e) {
      console.log('Error deleting photo', e);
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
export const userStore = new UserStore();
export const userContext = createContext(userStore);
