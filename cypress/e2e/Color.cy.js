describe('Color', () => {
    let uniqueName;
  beforeEach(() => {
    cy.loginAsAdmin();
    cy.goToAdminPanel();
    uniqueName = `Color${Date.now()}`;
  });

  it('COLOR REGISTRADO CORRECTAMENTE', () => {
    cy.get("[data-cy='registrar-btn']").click();
    cy.wait(1000);
    cy.get("[data-cy='registrar-color-btn']").click();
    cy.wait(1000);

    // Llenar formulario
    const uniqueName = `Color-${Date.now()}`;
    cy.get('input[name="nombre"]').type(uniqueName);
    cy.get('input[name="descripcion"]').type('Color azul oscuro elegante');
    
    // Enviar formulario
    cy.get('button[type="submit"]').click();
    
    // Verificar mensaje de éxito
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('COLOR REGISTRADO CON ÉXITO');
    });
  });

  it('COLOR CON NOMBRE DUPLICADO', () => {
    cy.get("[data-cy='registrar-btn']").click();
    cy.wait(1000);
    cy.get("[data-cy='registrar-color-btn']").click();
    cy.wait(1000);

    cy.get('input[name="nombre"]').type(uniqueName); // Color que ya existe
    cy.get('input[name="descripcion"]').type('Color existente');
    
    cy.get('button[type="submit"]').click();
    
    // Verificar manejo de error
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('ERROR');
    });
  });
});