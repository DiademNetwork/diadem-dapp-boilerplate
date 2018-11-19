import { FAKE_ACHIEVEMENT_TIMEOUT } from '../../src/mocks/stream'
import { INITIAL_ACHIEVEMENT_COUNT } from '../../src/stubs/achievements'

describe('Achievements', () => {
  beforeEach(() => {
    cy.clock()
    localStorage.setItem('do-not-show-splash', true)
    cy.visit('localhost:9000')
  })

  describe('Fetch and display', () => {
    it('Displays fetched achievemnts', () => {
      cy.get(`[data-qa-id^='achievement-item']`).should('have.length', INITIAL_ACHIEVEMENT_COUNT)
    })
  })

  describe('Suscribe', () => {
    it('Display new achievements received', () => {
      cy.get(`[data-qa-id^='achievement-item']`).should('have.length', INITIAL_ACHIEVEMENT_COUNT)
      cy.tick(FAKE_ACHIEVEMENT_TIMEOUT)
      cy.get(`[data-qa-id^='achievement-item']`).should('have.length', INITIAL_ACHIEVEMENT_COUNT + 1)
    })

    it('When on another page, a badge informs user of new items', () => {
      cy.get(`[data-qa-id="tab-users"]`).click()
      cy.get(`[data-qa-id='tab-badge-achievements']`).should('not.to.exist')
      cy.tick(FAKE_ACHIEVEMENT_TIMEOUT)
      cy.get(`[data-qa-id='tab-badge-achievements']`).should('to.exist')
    })
  })

  describe('Interractions', () => {
    describe('When not logged', () => {
      it('Does not show create or update button', () => {
        cy.get(`[data-qa-id='update-achievement-button']`).should('not.be.visible')
        cy.get(`[data-qa-id='create-achievement-button']`).should('not.be.visible')
      })

      it('Actions buttons on achievements are disabled', () => {
        cy.get(`[data-qa-id='achievement-0-confirm-button']`).should('be.disabled')
        cy.get(`[data-qa-id='achievement-0-support-button']`).should('be.disabled')
        cy.get(`[data-qa-id='achievement-0-deposit-button']`).should('be.disabled')
      })
    })

    describe('When logged', () => {
      it('Does not show create or update button', () => {
        cy.get(`[data-qa-id='update-achievement-button']`).should('not.be.visible')
        cy.get(`[data-qa-id='create-achievement-button']`).should('not.be.visible')
      })

      it('Actions buttons on achievements are disabled', () => {
        cy.get(`[data-qa-id='achievement-0-confirm-button']`).should('be.disabled')
        cy.get(`[data-qa-id='achievement-0-support-button']`).should('be.disabled')
        cy.get(`[data-qa-id='achievement-0-deposit-button']`).should('be.disabled')
      })
    })
  })
})
