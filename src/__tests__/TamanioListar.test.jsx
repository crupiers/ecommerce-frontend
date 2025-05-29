import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import ColorListar from "../TamanioListar";
import TamanioListar from "../TamanioListar";

jest.mock("../lib/axiosClient", () => ({
    AXIOS_CLIENT: {
        get: jest.fn(() =>
            Promise.resolve({
                data: [
                    { id: 1, nombre: "Pequeño", descripcion: "Tamaño pequeño" },
                    { id: 2, nombre: "Mediano", descripcion: "Tamaño mediano" },
                ],
            })
        ),
    },
}));

test("Renderiza y filtra la lista de tamaños correctamente", async () => {
    render(
        <MemoryRouter>
            <TamanioListar />
        </MemoryRouter>
    );

    // Verificar que el título se renderice
    expect(screen.getByText("LISTA TAMAÑOS")).toBeInTheDocument();

    // Esperar a que los tamaños se carguen
    expect(await screen.findByText("Pequeño")).toBeInTheDocument();
    expect(await screen.findByText("Mediano")).toBeInTheDocument();

    // Verificar que los datos se rendericen correctamente
    expect(screen.getByText("Tamaño pequeño")).toBeInTheDocument();
    expect(screen.getByText("Tamaño mediano")).toBeInTheDocument();

    // Simular búsqueda
    const searchInput = screen.getByPlaceholderText("Buscar por nombre");
    fireEvent.change(searchInput, { target: { value: "Pequeño" } });

    // Verificar que solo el tamaño buscado se muestre
    expect(screen.getByText("Pequeño")).toBeInTheDocument();
    expect(screen.queryByText("Mediano")).not.toBeInTheDocument();
});