describe('Help modal', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('localhost:9000')
  })

  it('a Help modal appears and can be closed', () => {
    cy.get(`[data-qa-id='help-modal']`).should('be.visible')
    cy.contains('Get me to Diadem Network').click()
    cy.get(`[data-qa-id='help-modal']`).should('not.be.visible')
  })

  it('User can chose not to see again Help modal', () => {
    cy.get(`[data-qa-id='help-do-not-show-checkbox'] input`).click()
    cy.get(`[data-qa-id='help-do-not-show-checkbox'] input`).should('be.checked')
    cy.visit('localhost:9000')
    cy.get(`[data-qa-id='help-modal']`).should('not.be.visible')
  })

  it('Help can be open from navbar', () => {
    cy.contains('Get me to Diadem Network').click()
    cy.get(`[data-qa-id='help-modal']`).should('not.be.visible')
    cy.get(`[data-qa-id='nav-show-help']`).click()
    cy.get(`[data-qa-id='help-modal']`).should('be.visible')
  })
})
