declare namespace Cypress {
  interface Chainable {
    createUser(user: {
      name: string;
      email: string;
      phone: string;
      allergies: string[];
    }): Chainable<{ name: string; email: string; phone: string }>;
  }
}
