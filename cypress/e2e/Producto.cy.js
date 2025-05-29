describe('producto', () => {

  beforeEach(() => {
    cy.visit ('http://localhost:5173/auth/login')
    cy.get('input[name="nombre"]').type('aldana');
    cy.get('input[name="contrasenia"]').type('Hola1234_');
    cy.get('button[type="submit"]').click();
  });

    
  it('registrar un producto correcto', () => {
        cy.get('button[name="boton-de-admin"]').click()
        cy.get("[data-cy='registrar-btn']").click();
        cy.get("[data-cy='registrar-producto-btn']").click();

        cy.get('input[name="nombre"]').type('Heladeraa');
        cy.get('input[name="descripcion"]').type('electrodoméstico que mantiene los alimentos frescos y seguros al enfriarlos');
        
        cy.get('input[name="precio"]').clear();
        cy.get('input[name="precio"]').type('1000000');
        
        cy.get('input[name="stock"]').clear();
        cy.get('input[name="stock"]').type('50');
        
        cy.get('input[name="umbral"]').clear();
        cy.get('input[name="umbral"]').type('10');

        cy.get('#colorId').select('Rojo');
        cy.get("#categoriaId").select("Muebles");
        cy.get("#marcaId").select("Samsung");
        cy.get("#tamanioId").select("Mediano");
        
        cy.get("input[name='codigoBarra']").clear();
        cy.get("input[name='codigoBarra']").type('12321321');

        cy.get('input[type=file]').selectFile('cypress/images.jpg', { force: true, action: 'drag-drop' })
        cy.wait(100);

        cy.get('button[type="submit"]').click();  
    });
})