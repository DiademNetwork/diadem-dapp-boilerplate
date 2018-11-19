describe('Hashtag modal', () => {
  beforeEach(() => {
    localStorage.setItem('do-not-show-splash', true)
    cy.visit('localhost:9000')
  })

  it('Help can be open from navbar and closed', () => {
    cy.get(`[data-qa-id='hashtag-modal']`).should('not.be.visible')
    cy.get(`[data-qa-id='nav-show-hashtag-modal']`).click()
    cy.get(`[data-qa-id='hashtag-modal']`).should('be.visible')
    cy.get(`[data-qa-id='close-hashtag-modal']`).click()
    cy.get(`[data-qa-id='hashtag-modal']`).should('not.be.visible')
  })
})
