describe('Facebook', () => {
  beforeEach(() => {
    localStorage.setItem('do-not-show-splash', true)
    cy.visit('localhost:9000')
  })

  it('a Facebook Login button is visible', () => {
    cy.get(`[data-qa-id='facebook-login-button']`).should('be.visible')
  })

  describe('When registered', () => {
    it('Facebook user name appears when clicking on login button', () => {
      cy.get(`[data-qa-id='facebook-login-button']`).click()
      cy.get(`[data-qa-id='facebook-login-user-name']`).should('be.visible')
    })
  })

  describe('When not registered', () => {
    beforeEach(() => {
      cy.get(`[data-qa-id='open-sandbox-config-button']`).click()
      cy.get(`[data-qa-id='sandbox-config-editor-checkbox-isUserRegistered']`).click()
      cy.get(`[data-qa-id='close-sandbox-config-button']`).click()
    })

    it('shows user name after user is registered', () => {
      cy.get(`[data-qa-id='facebook-login-button']`).click()
      cy.get(`[data-qa-id='facebook-login-user-name']`).should('be.visible')
    })
  })
})
