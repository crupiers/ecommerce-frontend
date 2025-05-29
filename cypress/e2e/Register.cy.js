describe('register', () => {
  it('register correcto', () => {
    cy.intercept('POST', 'http://localhost:8080/ecommerce/auth/register', (req) => {
      req.continue((res) => {
        console.log('Request Body:', req.body);
        console.log('Response Body:', res.body);
      });
    });

    cy.visit('http://localhost:5173/auth/register');
    const validUsername = `user-${Date.now()}`;
    cy.get('input[name="nombre"]').type(validUsername);
    cy.get('input[name="contrasenia"]').type('Hola1234_');
    cy.get('button[type="submit"').click();
  });
});
