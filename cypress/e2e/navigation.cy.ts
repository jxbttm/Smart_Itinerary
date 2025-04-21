describe('Navigation', () => {
    it('should navigate to home page', () => {
      cy.visit('/')
      cy.get('h1', { timeout: 6000 }).should('be.visible').contains('Plan Your Dream Trip')
    })
  })