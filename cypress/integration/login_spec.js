describe('Login', () => {
  beforeEach(() => {
    localStorage.setItem('do-not-show-splash', true)
    cy.visit('localhost:9000')
  })

  it('a Login button is visible', () => {
    cy.get(`[data-qa-id='login-button']`).should('be.visible')
  })

  describe('When registered', () => {
    it('User name appears when clicking on login button', () => {
      cy.get(`[data-qa-id='login-button']`).click()
      cy.get(`[data-qa-id='login-userName']`).should('be.visible')
    })
  })

  describe('When not registered', () => {
    beforeEach(() => {
      cy.get(`[data-qa-id='open-sandbox-config-button']`).click()
      cy.get(`[data-qa-id='sandbox-config-editor-checkbox-isRegistered']`).click()
      cy.get(`[data-qa-id='close-sandbox-config-button']`).click()
    })

    it('shows user name after user is registered', () => {
      cy.get(`[data-qa-id='login-button']`).click()
      cy.get(`[data-qa-id='login-userName']`).should('be.visible')
    })
  })
})
