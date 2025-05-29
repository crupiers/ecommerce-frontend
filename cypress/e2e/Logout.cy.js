describe('Logout', () => {
  it('deslogueo correcto', () => {
    cy.visit('http://localhost:5173/auth/login');
    cy.get('input[name="nombre"]').type('nacho');
    cy.get('input[name="contrasenia"]').type('Prueba_123');
    cy.get('button[type="submit"]').click();

    // Click on the username dropdown
    cy.get('.bi-person-fill').click();

    // Click on the logout button using className
    cy.get('button.me-2.align-items-center.d-flex').click();

    // Validate redirection to login page
    // cy.url().should('include', '/auth/login');
  });
});
