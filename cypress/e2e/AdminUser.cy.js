//PARA ESTE TEST NO DEBE EXISTIR EL USUARIO ADMIN EN LA BASE DE DATOS
describe('AdminUser', () => {
  it('REGISTRO, LOGUEO Y DESLOGUEO COMPLETOS', () => {
    //register a new user
    cy.wait(1000);
    cy.visit('http://localhost:5173/');
    cy.wait(1000);
    cy.get('a[href*="/auth/register"]').click();

    cy.wait(1000);
    
    const validUsername = `admin`;
    cy.get('input[name="nombre"]').type(validUsername);
    cy.wait(1000);

    const validPassword = 'Hola1234_';
    cy.get('input[name="contrasenia"]').type(validPassword);
    cy.wait(1000);

    cy.get('button[type="submit"').click();

    cy.wait(1000);

    //logout
    cy.get('.bi-person-fill').click();
    cy.wait(1000);
    cy.get('button.me-2.align-items-center.d-flex').click()

    //corroborar que va a la pagina de login
    cy.url().should('include', '/auth/login');

    cy.wait(1000);
    
    //login
    cy.get('input[name="nombre"]').type(validUsername);
    cy.wait(1000);
    cy.get('input[name="contrasenia"]').type(validPassword);
    cy.wait(1000);
    cy.get('button[type="submit"').click();

    //corroborar que va al catalogo
    cy.url().should('include', '/catalogo');

    cy.wait(1000);

    // Click on the username dropdown
    cy.get('.bi-person-fill').click();
    cy.wait(1000);

    // Click on the logout button using className
    cy.get('button.me-2.align-items-center.d-flex').click();
  })
})
//delete from usuario where nombre='admin';
