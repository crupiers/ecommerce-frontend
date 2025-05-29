import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import ColorListar from "../ColorListar";

jest.mock("../lib/axiosClient", () => ({
    AXIOS_CLIENT: {
        get: jest.fn(() =>
            Promise.resolve({
                data: [
                    { id: 1, nombre: "Rojo", descripcion: "Color rojo" },
                    { id: 2, nombre: "Azul", descripcion: "Color azul" },
                ],
            })
        ),
    },
}));

test("Renderiza y filtra la lista de colores correctamente", async () => {
    render(
        <MemoryRouter>
            <ColorListar />
        </MemoryRouter>
    );

    // Verificar que el título se renderice
    expect(screen.getByText("LISTA COLORES")).toBeInTheDocument();

    // Esperar a que los colores se carguen
    expect(await screen.findByText("Rojo")).toBeInTheDocument();
    expect(await screen.findByText("Azul")).toBeInTheDocument();

    // Verificar que los datos se rendericen correctamente
    expect(screen.getByText("Color rojo")).toBeInTheDocument();
    expect(screen.getByText("Color azul")).toBeInTheDocument();

    // Simular búsqueda
    const searchInput = screen.getByPlaceholderText("Buscar por nombre");
    fireEvent.change(searchInput, { target: { value: "Rojo" } });

    // Verificar que solo el color buscado se muestre
    expect(screen.getByText("Rojo")).toBeInTheDocument();
    expect(screen.queryByText("Azul")).not.toBeInTheDocument();
});
