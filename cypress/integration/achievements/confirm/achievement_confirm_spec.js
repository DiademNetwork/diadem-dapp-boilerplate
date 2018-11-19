import { ACHIEVEMENT_CONFIRM_SUCCESS_MESSAGE } from '../../../../src/modules/ui/notifications/actions'

describe('Achievement Confirm', () => {
  beforeEach(() => {
    cy.clock()
    localStorage.setItem('do-not-show-splash', true)
    cy.visit('localhost:9000')
  })

  describe('When logged', () => {
    beforeEach(() => {
      cy.get(`[data-qa-id='facebook-login-button']`).click()
      cy.get(`[data-qa-id='wallet-recover-cancel-button']`).click()
    })

    describe('When wallet is recovered', () => {
      beforeEach(() => {
        cy.get(`[data-qa-id='wallet-recover-button']`).click({ force: true })
        cy.get(`[data-qa-id='wallet-recover-form-mnemonic-input'] input`).type('any 12 words is good for mnemonic valiation in sandbox env yay')
        cy.get(`[data-qa-id='wallet-recover-submit-button']`).click()
      })

      describe('When balance is positive', () => {
        it('Confirm form is working', () => {
          cy.get(`[data-qa-id='achievement-0-confirm-button']`).click()
          cy.get(`[data-qa-id='achievement-0-confirm-modal']`).should('be.visible')
          cy.get(`[data-qa-id='achievement-0-confirm-submit-button']`).click()
          cy.contains(ACHIEVEMENT_CONFIRM_SUCCESS_MESSAGE)
        })
      })

      describe('When balance is negative', () => {
        // Case TO DO
      })
    })
  })
})
