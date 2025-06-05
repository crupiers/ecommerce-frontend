import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MarcaAuditoria } from "../MarcaAuditoria";
import { AXIOS_CLIENT } from "../lib/axiosClient";
import { MemoryRouter } from "react-router-dom";

jest.mock("../lib/axiosClient");

const marcasMock = [
    {
        id: 1,
        nombre: "Nike",
        descripcion: "Marca deportiva",
        createdBy: "Admin",
        createdAt: "2024-01-01",
        updatedBy: "Admin",
        updatedAt: "2024-01-02",
        deletedAt: null,
        estado: 0,
    },
    {
        id: 2,
        nombre: "Adidas",
        descripcion: "Otra marca",
        createdBy: "User",
        createdAt: "2024-01-03",
        updatedBy: "User",
        updatedAt: "2024-01-04",
        deletedAt: "2024-02-01",
        estado: 1,
    },
];

describe("MarcaAuditoria", () => {
    beforeEach(() => {
        AXIOS_CLIENT.get.mockResolvedValue({ data: marcasMock });
    });

    it("renderiza el título y la tabla", async () => {
        render(
            <MemoryRouter>
                <MarcaAuditoria />
            </MemoryRouter>
        );
        expect(screen.getByText(/AUDITORIA MARCAS/i)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText("Nike")).toBeInTheDocument();
            expect(screen.getByText("Adidas")).toBeInTheDocument();
        });
    });

    it("filtra por nombre", async () => {
        render(
            <MemoryRouter>
                <MarcaAuditoria />
            </MemoryRouter>
        );
        await waitFor(() => screen.getByText("Nike"));
        fireEvent.change(screen.getByPlaceholderText(/Buscar por nombre/i), {
            target: { value: "Adidas" },
        });
        expect(screen.queryByText("Nike")).not.toBeInTheDocument();
        expect(screen.getByText("Adidas")).toBeInTheDocument();
    });

    it("llama a eliminarMarca al hacer click en Eliminar", async () => {
        AXIOS_CLIENT.delete.mockResolvedValue({});
        render(
            <MemoryRouter>
                <MarcaAuditoria />
            </MemoryRouter>
        );
        await waitFor(() => screen.getByText("Eliminar"));
        window.alert = jest.fn();
        fireEvent.click(screen.getByText("Eliminar"));
        await waitFor(() => {
            expect(AXIOS_CLIENT.delete).toHaveBeenCalledWith("/marcas/1");
            expect(window.alert).toHaveBeenCalledWith("MARCA ELIMINADO CON ÉXITO");
        });
    });

    it("llama a activarMarca al hacer click en Activar", async () => {
        AXIOS_CLIENT.put.mockResolvedValue({});
        render(
            <MemoryRouter>
                <MarcaAuditoria />
            </MemoryRouter>
        );
        await waitFor(() => screen.getByText("Activar"));
        window.alert = jest.fn();
        fireEvent.click(screen.getByText("Activar"));
        await waitFor(() => {
            expect(AXIOS_CLIENT.put).toHaveBeenCalledWith("/marcas/recuperar/2");
            expect(window.alert).toHaveBeenCalledWith("MARCA ACTIVADO CON ÉXITO");
        });
    });
});