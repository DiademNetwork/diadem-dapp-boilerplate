describe('Users', () => {
  beforeEach(() => {
    localStorage.setItem('do-not-show-splash', true)
    cy.visit('localhost:9000')
    cy.get(`[data-qa-id="tab-users"]`).click()
  })

  it('displays', () => {
    cy.contains('Diadem Network users')
  })
})
