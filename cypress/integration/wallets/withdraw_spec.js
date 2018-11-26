import { WALLET_WITHDRAW_SUCCESS_MESSAGE } from '../../../src/modules/ui/notifications/actions'

describe('Wallets withdraw', () => {
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
        it('Withdraw form is working', () => {
          cy.get(`[data-qa-id='withdraw-button']`).click()
          cy.get(`[data-qa-id='withdraw-form-amount-input'] input`).type(5)
          cy.get(`[data-qa-id='withdraw-form-address-input'] input`).type('aValiDAdDress')
          cy.get(`[data-qa-id='withdraw-submit-button']`).click()
          cy.contains(WALLET_WITHDRAW_SUCCESS_MESSAGE)
        })
      })

      describe('When balance is negative', () => {
        // Case TO DO
      })
    })
  })
})
