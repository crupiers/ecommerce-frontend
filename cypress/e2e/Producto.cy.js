//TIENE QUE ESTAR EL USUARIO ADMIN REGISTRADO Y ALGUNAS ENTIDADES TAMBIÉN
//NO TIENE QUE EXISTIR EL PRODUCTO HELADERA
//delete from producto where nombre='Heladera';
describe('Producto', () => {

  beforeEach(() => {
    cy.visit ('http://localhost:5173/auth/login');
    cy.wait(1000);
    cy.get('input[name="nombre"]').type('admin');
    cy.get('input[name="contrasenia"]').type('Hola1234_');
    cy.get('button[type="submit"]').click();
  });

    
  it('PRODUCTO REGISTRADO CORRECTAMENTE', () => {
        cy.wait(1000);
        cy.get('button[name="boton-de-admin"]').click();
        cy.wait(1000);
        cy.get("[data-cy='registrar-btn']").click();
        cy.wait(1000);
        cy.get("[data-cy='registrar-producto-btn']").click();
        cy.wait(1000);
        cy.get('input[name="nombre"]').type('Heladera');
        cy.get('input[name="descripcion"]').type('Electrodoméstico que mantiene los alimentos frescos y seguros al enfriarlos');
        
        cy.get('input[name="precio"]').clear();
        cy.get('input[name="precio"]').type('1000000');
        
        cy.get('input[name="stock"]').clear();
        cy.get('input[name="stock"]').type('50');
        
        cy.get('input[name="umbral"]').clear();
        cy.get('input[name="umbral"]').type('10');

        cy.get('#colorId').select('Blanco');
        cy.get("#categoriaId").select("Electrodomestico");
        cy.get("#marcaId").select("Samsung");
        cy.get("#tamanioId").select("Mediano");
        
        cy.get("input[name='codigoBarra']").clear();
        cy.get("input[name='codigoBarra']").type('12321321');

        cy.get('input[type=file]').selectFile('cypress/e2e/Producto.cy.jpg', { force: true, action: 'drag-drop' })
        cy.wait(1000);

        cy.get('button[type="submit"]').click(); 
        
        cy.wait(1000);
        cy.get('a[href*="/catalogo"]').click();
    });
})
