import { ACHIEVEMENT_DEPOSIT_SUCCESS_MESSAGE } from '../../../../src/modules/ui/notifications/actions'

describe('Achievement Deposit', () => {
  beforeEach(() => {
    cy.clock()
    localStorage.setItem('do-not-show-splash', true)
    cy.visit('localhost:9000')
  })

  describe('When logged', () => {
    beforeEach(() => {
      cy.get(`[data-qa-id='login-button']`).click()
      cy.get(`[data-qa-id='wallet-recover-cancel-button']`).click()
    })

    describe('When wallet is recovered', () => {
      beforeEach(() => {
        cy.get(`[data-qa-id='wallet-recover-button']`).click({ force: true })
        cy.get(`[data-qa-id='wallet-recover-form-mnemonic-input'] input`).type('any 12 words is good for mnemonic valiation in sandbox env yay')
        cy.get(`[data-qa-id='wallet-recover-submit-button']`).click()
      })

      describe('When balance is positive', () => {
        it('Deposit form is working', () => {
          cy.get(`[data-qa-id='achievement-0-deposit-button']`).click()
          cy.get(`[data-qa-id='achievement-0-deposit-modal']`).should('be.visible')
          cy.get(`[data-qa-id='achievement-0-deposit-form-amount-input'] input`).type(1)
          cy.get(`[data-qa-id='achievement-0-deposit-form-witness-select']`).click()
          cy.get(`[data-qa-id='achievement-0-deposit-form-witness-0-select']`).click()
          cy.get(`[data-qa-id='achievement-0-deposit-submit-button']`).click({ force: true })
          cy.contains(ACHIEVEMENT_DEPOSIT_SUCCESS_MESSAGE)
        })
      })

      describe('When balance is negative', () => {
        // Case TO DO
      })
    })
  })
})
