describe("Task List", () => {
    beforeEach(() => {
      cy.visit("/tasks");
      cy.login(); 
    });
  
    it("Should display the task list", () => {
      cy.get(".task-item").should("have.length.greaterThan", 0);
    });
  });
  