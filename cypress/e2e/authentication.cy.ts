describe("Authenticated User", () => {

  const projectRef = "ofisnfgjitykwijevgwi";

  beforeEach(() => {
    cy.session('supabase-auth', () => {
      cy.visit("/plan-itinerary", {
        onBeforeLoad(win) {
          win.localStorage.setItem("NEXT_PUBLIC_ENABLE_MOCK_AUTH", "true");
        },
      });
      cy.request("/api/test-login");
      // Add assertions here to ensure the login was successful
      cy.url().should("include", "/plan-itinerary"); // Or a protected route
      cy.getCookie(`sb-${projectRef}-auth-token.0`).should('exist');
      cy.getCookie(`sb-${projectRef}-auth-token.1`).should('exist');
    });
  });

  // beforeEach(() => {
  //   cy.setCookie(`sb-${projectRef}-auth-token.0`, "fake-access-token");
  //   cy.setCookie(`sb-${projectRef}-auth-token.1`, "fake-refresh-token");

  //   cy.visit("/plan-itinerary", {
  //     onBeforeLoad(win) {
  //       win.localStorage.setItem("NEXT_PUBLIC_ENABLE_MOCK_AUTH", "true");
  //     },
  //   });

  //   cy.request("/api/test-login");
  // });


  it("does NOT show Google sign in when user is authenticated", () => {

    cy.setCookie(`sb-${projectRef}-auth-token.0`, "fake-access-token");
    cy.setCookie(`sb-${projectRef}-auth-token.1`, "fake-refresh-token");

    cy.url().should("include", "/plan-itinerary");

    // cy.contains("span", "Sign in with Google").should("not.exist");

    cy.get('input[type="checkbox"][name="my_preference"]').check({ force: true });

    cy.get(".swal2-container", { timeout: 8000 }).should("not.exist");
  });
});