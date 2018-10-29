describe('Achievements', () => {
  beforeEach(() => {
    localStorage.setItem('do-not-show-splash', true)
    cy.visit('localhost:9000')
  })

  describe('When not logged', () => {
    it('Does not show create or update button', () => {
      cy.get(`[data-qa-id='update-achievement-button']`).should('not.be.visible')
      cy.get(`[data-qa-id='create-achievement-button']`).should('not.be.visible')
    })

    it.only('Actions buttons on achievements are disabled', () => {
      cy.get(`[data-qa-id='achievement-0-confirm-button']`).should('be.disabled')
      cy.get(`[data-qa-id='achievement-0-support-button']`).should('be.disabled')
      cy.get(`[data-qa-id='achievement-0-deposit-button']`).should('be.disabled')
    })
  })
})
