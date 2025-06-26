Cypress.Commands.add('loginAsAdmin', () =>{
    cy.visit ('http://localhost:5173/auth/login');

    cy.get('input[name="nombre"]').type('admin');
    cy.get('input[name="contrasenia"]').type('Hola1234_');
    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('goToAdminPanel', () => {
    cy.get('button[name="boton-de-admin"]').click();
});

Cypress.Commands.add('registerMarca', (nombre, descripcion) => {
    cy.get("[data-cy='registrar-btn']").click();
    cy.get("[data-cy='registrar-marca-btn']").click();
    cy.wait(1000);
    cy.get('input[name="nombre"]').type(nombre);
    cy.get('input[name="descripcion"]').type(descripcion);
    cy.get('button[type="submit"]').click();
});
Cypress.Commands.add('registerTamanio', (nombre, descripcion) => {
    cy.get("[data-cy='registrar-btn']").click();
    cy.get("[data-cy='registrar-tamanio-btn']").click();
    cy.wait(1000);
    cy.get('input[name="nombre"]').type(nombre);
    cy.get('input[name="descripcion"]').type(descripcion);
    cy.get('button[type="submit"]').click();
});
Cypress.Commands.add('registerCategoria', (nombre, descripcion) => {
    cy.get("[data-cy='registrar-btn']").click();
    cy.get("[data-cy='registrar-categoria-btn']").click();
    cy.wait(1000);
    cy.get('input[name="nombre"]').type(nombre);
    cy.get('input[name="descripcion"]').type(descripcion);
    cy.get('button[type="submit"]').click();
});
Cypress.Commands.add('registerColor', (nombre, descripcion) => {
    cy.get("[data-cy='registrar-btn']").click();
    cy.wait(2000);
    cy.get("[data-cy='registrar-color-btn']").click();
    cy.wait(1000);
    cy.get('input[name="nombre"]').type(nombre);
    cy.get('input[name="descripcion"]').type(descripcion);
    cy.get('button[type="submit"]').click();
});