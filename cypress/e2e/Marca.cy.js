describe('Marca', () => {
    let uniqueName;
  beforeEach(() => {
    cy.loginAsAdmin();
    cy.goToAdminPanel();
    uniqueName = `Marca${Date.now()}`;
  });

  it('MARCA REGISTRADA CORRECTAMENTE', () => {
    cy.get("[data-cy='registrar-btn']").click();
    cy.wait(1000);
    cy.get("[data-cy='registrar-marca-btn']").click();
    cy.wait(1000);

    // Llenar formulario
    const uniqueName = `Marca${Date.now()}`;
    cy.get('input[name="nombre"]').type(uniqueName);
    cy.get('input[name="descripcion"]').type('Marca líder en electrodomésticos');
    
    // Enviar formulario
    cy.get('button[type="submit"]').click();
    
    // Verificar mensaje de éxito
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('MARCA REGISTRADO CON ÉXITO');
    });
  });

  it('MARCA CON NOMBRE DUPLICADO', () => {
    cy.get("[data-cy='registrar-btn']").click();
    cy.wait(1000);
    cy.get("[data-cy='registrar-marca-btn'']").click();
    cy.wait(1000);

    cy.get('input[name="nombre"]').type(uniqueName); // Marca que ya existe
    cy.get('input[name="descripcion"]').type('Marca existente');
    
    cy.get('button[type="submit"]').click();
    
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('ERROR AL REGISTRAR MARCA');
    });
  });
});