import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { ProductoListar } from "../ProductoListar.jsx";

jest.mock("../lib/axiosClient", () => ({
    AXIOS_CLIENT: {
        get: jest.fn(() =>
            Promise.resolve({
                data: [
                    {
                        id: 1,
                        nombre: "Producto A",
                        descripcion: "Descripción A",
                        precio: 100,
                        umbral: 10,
                        stock: 50,
                        nombreCategoria: "Categoría A",
                        nombreMarca: "Marca A",
                        nombreTamanio: "Tamaño A",
                        nombreColor: "Color A",
                        codigoBarra: "123456789",
                    },
                    {
                        id: 2,
                        nombre: "Producto B",
                        descripcion: "Descripción B",
                        precio: 200,
                        umbral: 20,
                        stock: 30,
                        nombreCategoria: "Categoría B",
                        nombreMarca: "Marca B",
                        nombreTamanio: "Tamaño B",
                        nombreColor: "Color B",
                        codigoBarra: "987654321",
                    },
                ],
            })
        ),
    },
}));

test("Renderiza y filtra la lista de productos correctamente", async () => {
    render(
        <MemoryRouter>
            <ProductoListar />
        </MemoryRouter>
    );

    // Verificar que el título se renderice
    expect(screen.getByText("LISTA PRODUCTOS")).toBeInTheDocument();

    // Esperar a que los productos se carguen
    expect(await screen.findByText("Producto A")).toBeInTheDocument();
    expect(await screen.findByText("Producto B")).toBeInTheDocument();

    // Verificar que los datos se rendericen correctamente
    expect(screen.getByText("Descripción A")).toBeInTheDocument();
    expect(screen.getByText("Descripción B")).toBeInTheDocument();
    // precios
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
    // umbrales
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    // stocks
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    // categorías, marcas, tamaños, colores y códigos de barra
    expect(screen.getByText("Categoría A")).toBeInTheDocument();
    expect(screen.getByText("Categoría B")).toBeInTheDocument();
    expect(screen.getByText("Marca A")).toBeInTheDocument();
    expect(screen.getByText("Marca B")).toBeInTheDocument();
    expect(screen.getByText("Tamaño A")).toBeInTheDocument();
    expect(screen.getByText("Tamaño B")).toBeInTheDocument();
    expect(screen.getByText("Color A")).toBeInTheDocument();
    expect(screen.getByText("Color B")).toBeInTheDocument();
    expect(screen.getByText("123456789")).toBeInTheDocument();
    expect(screen.getByText("987654321")).toBeInTheDocument();


    // Simular búsqueda
    const searchInput = screen.getByPlaceholderText("Buscar por nombre");
    fireEvent.change(searchInput, { target: { value: "Producto A" } });

    // Verificar que solo el producto buscado se muestre
    expect(screen.getByText("Producto A")).toBeInTheDocument();
    expect(screen.queryByText("Producto B")).not.toBeInTheDocument();
}); 