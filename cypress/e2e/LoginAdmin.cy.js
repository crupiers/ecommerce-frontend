describe('LoginAdmin', () => {
  it('logueo correcto', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[name="nombre"]').type('admin');
    cy.get('input[name="contrasenia"]').type('Hola1234_');
    cy.get('button[type="submit"').click();
  })
})