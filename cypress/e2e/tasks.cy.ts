describe("Task Management Tests", () => {
    beforeEach(() => {
      cy.login(); 
    });
  
    it("should display the tasks after login", () => {
      cy.url().should("include", "/tasks");
    });
  
    it("should load the tasks list", () => {
      cy.visit("/tasks");
      cy.get(".task-item", { timeout: 10000 })
      .should("have.length.gte", 0);
    
    });
  
    it("should open task details when clicking a task", () => {
      cy.get(".task-item").first().click();
      cy.url().should("include", "/tasks");
    });
  });
  