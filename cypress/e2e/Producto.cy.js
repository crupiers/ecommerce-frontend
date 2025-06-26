//TIENE QUE ESTAR EL USUARIO ADMIN REGISTRADO Y ALGUNAS ENTIDADES TAMBIÉN
//NO TIENE QUE EXISTIR EL PRODUCTO HELADERA
//delete from producto where nombre='Heladera';
describe('Producto', () => {
  let uniqueNameProducto;
  let uniqueNameColor;
  let uniqueNameCategoria;
  let uniqueNameMarca;
  let uniqueNameTamanio;
  beforeEach(() => {
    cy.loginAsAdmin();
    cy.goToAdminPanel();
    uniqueNameColor = `Color${Date.now()}`;
    uniqueNameCategoria = `Categoria${Date.now()}`;
    uniqueNameMarca = `Marca${Date.now()}`;
    uniqueNameTamanio = `Tamanio${Date.now()}`;
    cy.registerColor(uniqueNameColor, 'Color blanco basico');
    cy.registerCategoria(uniqueNameCategoria, 'Categoria de productos electrodomesticos');
    cy.registerMarca(uniqueNameMarca, 'Marca lider en tecnologia');
    cy.registerTamanio(uniqueNameTamanio, 'Tamaño mediano para productos de uso diario');
    uniqueNameProducto = `Heladera${Date.now()}`;
  });

    
  it('PRODUCTO REGISTRADO CORRECTAMENTE', () => {
        cy.get("[data-cy='registrar-btn']").click();
        cy.wait(1000);
        cy.get("[data-cy='registrar-producto-btn']").click();
        cy.wait(1000);
        cy.get('input[name="nombre"]').type(uniqueNameProducto);
        cy.get('input[name="descripcion"]').type('Electrodomestico que mantiene los alimentos frescos y seguros al enfriarlos');
        
        cy.get('input[name="precio"]').clear();
        cy.get('input[name="precio"]').type('1000000');
        
        cy.get('input[name="stock"]').clear();
        cy.get('input[name="stock"]').type('50');
        
        cy.get('input[name="umbral"]').clear();
        cy.get('input[name="umbral"]').type('10');

        cy.get('#colorId').select(uniqueNameColor);
        cy.get("#categoriaId").select(uniqueNameCategoria);
        cy.get("#marcaId").select(uniqueNameMarca);
        cy.get("#tamanioId").select(uniqueNameTamanio);

        cy.get("input[name='codigoBarra']").clear();
        cy.get("input[name='codigoBarra']").type('12321321');

        cy.get('input[type=file]').selectFile('cypress/e2e/Producto.cy.jpg', { force: true, action: 'drag-drop' })
        cy.wait(1000);

        cy.get('button[type="submit"]').click(); 
        
        cy.wait(1000);
        cy.get('a[href*="/catalogo"]').click();

        cy.expect(cy.get('.card-title.h5').contains(uniqueNameProducto)).to.exist;
    });
})
