describe("Edit Task", () => {
    beforeEach(() => {
      cy.visit("/tasks");
      cy.login(); 
    });
  
    it('should open the edit modal, update the task, and save changes', () => {
      cy.get('[data-cy=edit-button]').first().click();
  
      cy.get('.modal-content').should('be.visible');
  
      cy.get('input[formControlName="title"]').clear().type('New Cypress Task');
      cy.get('textarea[formControlName="description"]').clear().type('Updated Task Description');
      cy.get('mat-select[formControlName="status"]').click();
      cy.get('mat-option').contains('Completed').click();
      cy.get('input[formControlName="dueDate"]').clear().type('2025-12-31');
  
      cy.get('.create-update-btn').click();
      cy.get('.modal-content').should('not.exist');
    });
  });
  