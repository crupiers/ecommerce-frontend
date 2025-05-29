describe('LoginAdmin', () => {
  it('logueo correcto', () => {
    //register a new user
    cy.visit('http://localhost:5173/auth/register');
    const validUsername = `user-${Date.now()}`;
    cy.get('input[name="nombre"]').type(validUsername);
    const validPassword = 'Hola1234_';
    cy.get('input[name="contrasenia"]').type(validPassword);
    cy.get('button[type="submit"').click();

    //logout
    cy.get('.bi-person-fill').click();
    cy.get('button.me-2.align-items-center.d-flex').click()

    //corroborar que va a la pagina de login
    cy.url().should('include', '/auth/login');

    //login
    cy.get('input[name="nombre"]').type(validUsername);
    cy.get('input[name="contrasenia"]').type(validPassword);
    cy.get('button[type="submit"').click();

    //corroborar que va al catalogo
    cy.url().should('include', '/catalogo');
  })
})