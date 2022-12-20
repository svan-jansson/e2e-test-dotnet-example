describe("Mauna Loa Eruption Detector", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("gets a new measurement when user clicks the action button", () => {
    cy.get("button").click();
    cy.get("tbody > :nth-child(1) > :nth-child(1)").should(
      "have.text",
      "0 seconds ago"
    );
  });
});
