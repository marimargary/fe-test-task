describe("Edit User", () => {
  let userData: { username: string; phone: string; allergies: string[] };
  let allergiesData: { allergies: string[] };

  before(() => {
    cy.fixture("user").then((data) => {
      userData = data;
    });
    cy.fixture("allergies")
      .then((data) => {
        allergiesData = data;
      });
  });

  beforeEach(() => {
    const dynamicName = `${userData.username}.${Date.now()}`;
    const dynamicEmail = `${userData.username}.${Date.now()}@example.com`;

    const userWithDynamicData = {
      ...userData,
      name: dynamicName,
      email: dynamicEmail,
      phone: userData.phone,
    };

    cy.createUser(userWithDynamicData).then((user) => {
      expect(user.name).to.eq(dynamicName);
      expect(user.email).to.eq(dynamicEmail);
      expect(user.phone).to.eq(userData.phone);
    });

    cy.visit(`${Cypress.env("baseUrl")}/`);

    cy.get('[data-testid="users-list-title"]').should("be.visible");

  });

  it("Should edit a user email and reflect changes in the UI", function () {
    cy.get<{ name: string; email: string; phone: string }>("@user").then((user) => {
      cy.get('[data-testid="users-list-grid"]')
        .contains(user.name)
        .parents('[data-testid="users-list-grid"]')
        .within(() => {
          cy.get('[data-testid="CreateIcon"]').click();
        });

      const updatedEmail = `updated.${user.email}`;
      cy.get('[data-testid="EmailIcon"]').click();
      cy.get('[data-testid="user-email-input"] input').clear().type(updatedEmail);

      cy.get('[data-testid="save-button"]').click();
      cy.get('[data-testid="success-toast"]').should("contain", "User email updated successfully!");

      cy.get('[data-testid="users-list-grid"]')
        .contains(user.name)
        .parents('[data-testid="users-list-grid"]')
        .within(() => {
          cy.contains(updatedEmail).should("be.visible");
        });
    });
  });

  it("Should edit a user phone and reflect changes in the UI", function () {
    cy.get<{ name: string; email: string; phone: string }>("@user").then((user) => {

      cy.get('[data-testid="users-list-grid"]')
        .contains(user.name)
        .parents('[data-testid="users-list-grid"]')
        .within(() => {
          cy.get('[data-testid="CreateIcon"]').click();
        });

      const updatedPhone = "9876543210";
      cy.get('[data-testid="LocalPhoneIcon"]').click();
      cy.get('[data-testid="user-phone-input"]  input').clear().type(updatedPhone);

      cy.get('[data-testid="save-button"]').click();
      cy.get('[data-testid="success-toast"]').should("contain", "User phone updated successfully!");

      cy.get('[data-testid="users-list-grid"]')
        .contains(user.name)
        .parents('[data-testid="users-list-grid"]')
        .within(() => {
          cy.contains(updatedPhone).should("be.visible");
        });
    });
  });

  it("Should edit a user allergies and reflect changes in the UI", function () {
    cy.get<{ name: string; email: string; phone: string }>("@user").then((user) => {

      cy.get('[data-testid="users-list-grid"]')
        .contains(user.name)
        .parents('[data-testid="users-list-grid"]')
        .within(() => {
          cy.get('[data-testid="CreateIcon"]').click();
        });

      cy.get('[data-testid="BrightnessLowIcon').click();
      cy.get('[data-testid="user-allergies-input"]').click();
      allergiesData.allergies.forEach((allergy) => {
        cy.contains(allergy).click();
      });

      cy.get('[data-testid="save-button"]').click({ force: true });
      cy.get('[data-testid="success-toast"]').should(
        "contain",
        "User allergies updated successfully",
      );

      cy.get('[data-testid="users-list-grid"]')
        .contains(user.name)
        .parents('[data-testid="users-list-grid"]')
        .within(() => {
          ["Peanuts", "Shellfish", "Gluten", "Soy"].forEach((allergy) => {
            cy.contains(allergy).should("be.visible");
          });
        });
    });
  });
});
