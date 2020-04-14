/* eslint-disable no-undef */
describe('Task Board', () => {
  it('visits sprint planner', () => {
    cy.visit('localhost:3000')
  })

  describe('Task can be edited', function () {
    it('should open task in fullscreen when tapped', function () {
      cy.get('[data-id="0"] > :nth-child(2)').click();
    });

    it('should not save changes when edit is cancelled', function () {
      cy.get('.task_card_edit_wrapper h1').clear().type("Changed");
      cy.get('.task_card_edit_wrapper .destructive').click();
      cy.get('[data-id="0"] > :nth-child(2)').should('contain', 'Add registration form');
    });

    it('should show entire description when opened', function () {
      cy.get('[data-id="2"] > :nth-child(2) > p').should('contain', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros vitae porttitor gravida. Etiam at scelerisque risus. Nullam rutrum odio at mi sodale...');
      cy.get('[data-id="2"] > :nth-child(2)').click();
      cy.get('.task_card_edit_wrapper > .task_card > p').should('contain', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum eros vitae porttitor gravida. Etiam at scelerisque risus. Nullam rutrum odio at mi sodales, eget gravida tortor luctus. Curabitur accumsan, tellus sit amet ultricies vestibulum, magna orci elementum mauris, ut sagittis nibh magna sit amet libero.');
      cy.get('.task_card_edit_wrapper .destructive').click();
    })

    it('should save updates', function () {
      cy.get('[data-id="2"] > :nth-child(2)').click();
      cy.get('.task_card_edit_wrapper h1').clear().type("New title");
      cy.get('.task_card_edit_wrapper p').clear().type("New description");
      cy.get('.task_card_edit_wrapper .positive').click();
      cy.get('[data-id="2"] > :nth-child(2)').should('contain', "New title");
      cy.get('[data-id="2"] > :nth-child(2)').should('contain', "New description");
    })
  });
})
