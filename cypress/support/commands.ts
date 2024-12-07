/// <reference types="cypress" />

Cypress.Commands.add(
  "createUser",
  (user: { name: string; email: string; phone: string; allergies: string[] }) => {
    cy.request("POST", `${Cypress.env("apiUrl")}addUser`, user).then((response) => {
      expect(response.status).to.eq(201);
      cy.wrap(response.body).as("user");
    });
  },
);
