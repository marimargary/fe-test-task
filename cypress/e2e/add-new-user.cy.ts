describe("Add New User", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}/`);
    cy.get('[data-testid="users-list-title"]').should("be.visible");
  });

  it("Should add a new user successfully", () => {
    cy.get('[data-testid="add-user-button"]').click();

    cy.fixture("user").then((user: { username: string; phone: string }) => {
      const dynamicName = `${user.username}.${Date.now()}`;
      const dynamicEmail = `${user.username}.${Date.now()}@example.com`;

      cy.get('[data-testid="user-name-input"]').type(dynamicName);
      cy.get('[data-testid="user-email-input"]').type(dynamicEmail);
      cy.get('[data-testid="user-phone-input"]').type(user.phone);

       cy.fixture("allergies.json").then((data: { allergies: string[] }) => {
        cy.get('[data-testid="allergies-form-control"]').click();
        data.allergies.forEach((allergy) => {
          cy.contains(allergy).click();
        });
      });

      cy.get('[data-testid="save-button"]').click();

      cy.get('[data-testid="success-toast"]')
        .contains("User created successfully")
        .should("be.visible");

      cy.get('[data-testid="users-list-grid"]').contains(dynamicName).should("be.visible");
      cy.get('[data-testid="users-list-grid"]').contains(dynamicEmail).should("be.visible");
    });
  });
});
