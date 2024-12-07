describe("Allergy Filtering", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}/addUser`); 

  });

  it("Should filter allergy options as the user types", () => {
    cy.fixture("allergies.json").then((data: { allergies: string[] }) => {
      cy.intercept("GET", "**/allergies*", (req) => {
        const query = req.query.search || "";
        req.reply(
          data.allergies.filter((allergy) =>
            allergy.toLowerCase().includes((query as string).toLowerCase()),
          ),
        );
      }).as("getFilteredAllergies");

      cy.get('[data-testid="allergies-form-control"]').type("Pea");

      cy.wait("@getFilteredAllergies");

      cy.get('[data-testid^="allergies-option-"]').within(() => {
        cy.contains("Peanuts").should("be.visible");
        cy.contains("Shellfish").should("not.exist");
      });
    });
  });
});
