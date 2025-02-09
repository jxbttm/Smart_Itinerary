describe('Navigation', () => {
    it('testing', () => {
      // Start from the index page
      cy.visit('https://www.nus.edu.sg/')
      cy.get('span').contains('Home')
    })
  })