import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MarcaListar from "../MarcaListar";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock AXIOS_CLIENT
jest.mock("../lib/axiosClient", () => ({
    AXIOS_CLIENT: {
        get: jest.fn(() =>
            Promise.resolve({
                data: [
                    { id: 1, nombre: "Marca A", descripcion: "Descripción A" },
                    { id: 2, nombre: "Marca B", descripcion: "Descripción B" },
                ],
            }),
        ),
    },
}));

test("Renderiza y filtra la lista de marcas correctamente", async () => {
    render(
        <BrowserRouter>
            <MarcaListar />
        </BrowserRouter>
    );

    // Verificar que el título se renderice
    expect(screen.getByText("LISTA MARCAS")).toBeInTheDocument();

    // Esperar a que las marcas se carguen
    expect(await screen.findByText("Marca A")).toBeInTheDocument();
    expect(await screen.findByText("Marca B")).toBeInTheDocument();

    // Verificar que los datos se rendericen correctamente
    expect(screen.getByText("Descripción A")).toBeInTheDocument();
    expect(screen.getByText("Descripción B")).toBeInTheDocument();

    // Simular búsqueda
    const searchInput = screen.getByPlaceholderText("Buscar por nombre");
    fireEvent.change(searchInput, { target: { value: "Marca A" } });

    // Verificar que solo la marca buscada se muestre
    expect(screen.getByText("Marca A")).toBeInTheDocument();
    expect(screen.queryByText("Marca B")).not.toBeInTheDocument();
});

