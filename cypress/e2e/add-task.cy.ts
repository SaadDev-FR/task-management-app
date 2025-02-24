describe("Add Task", () => {
    beforeEach(() => {
      cy.login(); 
    });
  
    it("Should open the add task modal", () => {
      cy.get(".create-task-button").click();
      cy.get(".modal-overlay").should("be.visible");
    });
  
    it("Should add a new task", () => {
      cy.get(".create-task-button").click();
      cy.get("input[formControlName='title']").type("New Cypress Task");
      cy.get("textarea[formControlName='description']").type("This is a test task.");
      cy.get("mat-select[formControlName='status']").click();
      cy.get("mat-option").contains("Pending").click();
      const today = new Date().toISOString().split("T")[0];
      cy.get("input[formControlName='dueDate']").type(today);
      cy.get(".create-update-btn").contains("Create").click();
      cy.get(".task-item").contains("New Cypress Task").should("exist");
    });
  });
  