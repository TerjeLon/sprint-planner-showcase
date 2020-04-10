
/* eslint-disable no-undef */
describe('Task Board', () => {
  it('visits sprint planner', () => {
    cy.visit('localhost:3000')
  })

  describe('Tasks can move', () => {
    it('moves to another category', () => {
      cy.get('[data-id="0"] > :nth-child(2)').drag('[data-id="2"] > :nth-child(2)', 'bottom');
      cy.get('[data-id="2"] > :nth-child(3)').should('contain', 'Add registration form');
      cy.get('[data-id="0"] .category_total_tasks').should('contain', '5');
      cy.get('[data-id="2"] .category_total_tasks').should('contain', '3');
    })

    it('moves within its own category', () => {
      cy.get('[data-id="0"] > :nth-child(2)').drag('[data-id="0"] > :nth-child(3)', 'bottom');
      cy.get('[data-id="0"] > :nth-child(3)').should('contain', 'Login screen is cut on smaller screens');
      cy.get('[data-id="0"] .category_total_tasks').should('contain', '5');
    })

    it('moves back to its original position', () => {
      cy.get('[data-id="0"] > :nth-child(3)').drag('[data-id="0"] > :nth-child(2)', 'top');
      cy.get('[data-id="0"] > :nth-child(2)').should('contain', 'Login screen is cut on smaller screens');
      cy.get('[data-id="0"] .category_total_tasks').should('contain', '5');
    })
  })
})
