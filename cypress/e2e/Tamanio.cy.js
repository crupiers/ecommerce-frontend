describe('Tamanio', () => {
  let uniqueName;

  beforeEach(() => {
    cy.loginAsAdmin();
    cy.goToAdminPanel();
    uniqueName = `Tamanio${Date.now()}`;
  });

  it('TAMAÑO REGISTRADO CORRECTAMENTE', () => {
    cy.get("[data-cy='registrar-btn']").click();
    cy.wait(1000);
    cy.get("[data-cy='registrar-tamanio-btn']").click();
    cy.wait(1000);

    // Llenar formulario
    
    cy.get('input[name="nombre"]').type(uniqueName);
    cy.get('input[name="descripcion"]').type('Tamanio extra grande para productos voluminosos');
    
    // Enviar formulario
    cy.get('button[type="submit"]').click();
    
    // Verificar mensaje de éxito
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('TAMAÑO REGISTRADO CON ÉXITO');
    });
  });

  it('TAMAÑO CON NOMBRE DUPLICADO', () => {
    cy.get("[data-cy='registrar-btn']").click();
    cy.wait(1000);
    cy.get("[data-cy='registrar-tamanio-btn']").click();
    cy.wait(1000);

    cy.get('input[name="nombre"]').type(uniqueName);
    cy.get('input[name="descripcion"]').type('Tamanio existente');
    
    cy.get('button[type="submit"]').click();
    
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('ERROR AL REGISTRAR TAMAÑO');
    });
  });
});