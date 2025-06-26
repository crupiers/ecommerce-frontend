describe('Categoria', () => {
  let uniqueName;
  beforeEach(() => {
    cy.loginAsAdmin();
    cy.goToAdminPanel();
    uniqueName = `Categoria${Date.now()}`;
  });

  it('CATEGORÍA REGISTRADA CORRECTAMENTE', () => {
    cy.get("[data-cy='registrar-btn']").click();
    cy.wait(1000);
    cy.get("[data-cy='registrar-categoria-btn']").click();
    cy.wait(1000);

    // Llenar formulario
    cy.get('input[name="nombre"]').type(uniqueName);
    cy.get('input[name="descripcion"]').type('Categoria de productos electronicos');

    // Enviar formulario
    cy.get('button[type="submit"]').click();

    // Verificar mensaje de éxito
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('CATEGORÍA REGISTRADA CON ÉXITO');
    });
  });

  it('CATEGORÍA CON NOMBRE DUPLICADO', () => {
    cy.get("[data-cy='registrar-btn']").click();
    cy.wait(1000);
    cy.get("[data-cy='registrar-categoria-btn']").click();
    cy.wait(1000);

    cy.get('input[name="nombre"]').type(uniqueName); // Categoría que ya existe
    cy.get('input[name="descripcion"]').type('Categoria duplicada');

    cy.get('button[type="submit"]').click();

    // Verificar manejo de error
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('ERROR AL REGISTRAR CATEGORÍA');
    });
  });
});