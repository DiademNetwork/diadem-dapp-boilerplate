describe('Facebook', () => {
  beforeEach(() => {
    localStorage.setItem('do-not-show-splash', true)
    cy.visit('localhost:9000')
  })

  it('a Facebook Login button is visible', () => {
    cy.get(`[data-qa-id='facebook-login-button']`).should('be.visible')
  })
})
