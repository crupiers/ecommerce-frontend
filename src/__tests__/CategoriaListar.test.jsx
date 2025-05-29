import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CategoriaListar from "../CategoriaListar";
import { BrowserRouter } from "react-router-dom";
import { AXIOS_CLIENT } from "../lib/axiosClient";
import "@testing-library/jest-dom";

// Mock axios client
jest.mock("../lib/axiosClient", () => ({
    AXIOS_CLIENT: {
        get: jest.fn(() =>
            Promise.resolve({
                data: [
                    { id: 1, nombre: "Electrónica", descripcion: "Productos electrónicos" },
                    { id: 2, nombre: "Ropa", descripcion: "Vestimenta y accesorios" },
                ],
            }),
        )    
    },
}));

test("Renderiza y filtra la lista de categorías correctamente", async () => {
    render(
        <BrowserRouter>
            <CategoriaListar />
        </BrowserRouter>
    );

    // Verificar que el título se renderice
    expect(screen.getByText("LISTA CATEGORIAS")).toBeInTheDocument();

    // Esperar a que las categorías se carguen
    expect(await screen.findByText("Electrónica")).toBeInTheDocument();
    expect(await screen.findByText("Ropa")).toBeInTheDocument();

    // Verificar que los datos se rendericen correctamente
    expect(screen.getByText("Productos electrónicos")).toBeInTheDocument();
    expect(screen.getByText("Vestimenta y accesorios")).toBeInTheDocument();

    // Simular búsqueda
    const searchInput = screen.getByPlaceholderText("Buscar por nombre");
    fireEvent.change(searchInput, { target: { value: "Electrónica" } });

    // Verificar que solo la categoría buscada se muestre
    expect(screen.getByText("Electrónica")).toBeInTheDocument();
    expect(screen.queryByText("Ropa")).not.toBeInTheDocument();
});