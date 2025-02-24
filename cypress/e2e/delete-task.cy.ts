describe("Delete Task", () => {
    beforeEach(() => {
      cy.login(); 
    });
  
    it("Should delete a task", () => {
      cy.get(".task-actions").first().within(() => {
        cy.get(".delete-btn").click();
      });
  
      cy.get(".task-item").should("have.length.lessThan", 5);
    });
  });

  