describe('Timeline', () => {
  beforeEach(() => {
    localStorage.setItem('do-not-show-splash', true)
    cy.visit('localhost:9000')
    cy.get(`[data-qa-id="tab-timeline"]`).click()
  })

  it('displays', () => {
    cy.contains('Diadem network last activities')
  })
})
