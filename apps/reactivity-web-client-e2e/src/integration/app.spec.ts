import { getGreeting } from '../support/app.po';

describe('reactivity-web-client', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to reactivity-web-client!');
  });
});
