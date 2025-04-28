describe("Hotel Search and Add", () => {
  it("search for a hotel place and select a result and gets redirected to search result page", () => {
    cy.visit("/hotel?itinerary=26");

    cy.get("#search").type("brazil");

    // Wait for the whole list to appear
    cy.get('[data-testid="search-options"]').should("be.visible");

    // Click the first item inside
    cy.get('[data-testid="search-options"]').within(() => {
      cy.get('[data-testid="search-option"]').first().click();
    });

    // Check URL contains expected path
    cy.url().should("include", "/search");

    // Wait for cards to appear
    cy.get(".card").should("exist").and("have.length.greaterThan", 0);
  });

  it("clicks the last card add to itinerary button and should show Swal2 and redirect on confirm", () => {
    cy.get(".card")
      .last()
      .within(() => {
        cy.get('[data-testid="hotel-name"]')
          .invoke("text")
          .then((text) => text.trim())
          .as("selectedHotelName");
        cy.contains("Add to Itinerary").click();
      });

    // Check that Swal2 modal appears
    cy.get(".swal2-popup").should("be.visible");
    cy.get(".swal2-html-container").should("contain", "Are you sure");

    // Click the confirm button
    cy.get(".swal2-confirm").click();

    // Assert redirection (wait for new page)
    cy.url().should("include", "/itinerary");

    // Assert the hotel name appears on the new page
    cy.get("@selectedHotelName").then((name) => {
      cy.contains(name as unknown as string).should("exist");
    });
  });
});
