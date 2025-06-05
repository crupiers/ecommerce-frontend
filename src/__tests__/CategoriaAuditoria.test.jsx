import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CategoriaAuditoria } from "../CategoriaAuditoria";
import { AXIOS_CLIENT } from "../lib/axiosClient";
import { MemoryRouter } from "react-router-dom";

jest.mock("../lib/axiosClient");

const categoriasMock = [
    {
        id: 1,
        nombre: "Categoria 1",
        descripcion: "Desc 1",
        createdBy: "Admin",
        createdAt: "2024-01-01",
        updatedBy: "Admin",
        updatedAt: "2024-01-02",
        deletedAt: null,
        estado: 0,
    },
    {
        id: 2,
        nombre: "Categoria 2",
        descripcion: "Desc 2",
        createdBy: "User",
        createdAt: "2024-01-03",
        updatedBy: "User",
        updatedAt: "2024-01-04",
        deletedAt: "2024-02-01",
        estado: 1,
    },
];

describe("CategoriaAuditoria", () => {
    beforeEach(() => {
        AXIOS_CLIENT.get.mockResolvedValue({ data: categoriasMock });
    });

    it("renderiza el título y la tabla", async () => {
        render(
            <MemoryRouter>
                <CategoriaAuditoria />
            </MemoryRouter>
        );
        expect(screen.getByText(/AUDITORIA CATEGORIAS/i)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText("Categoria 1")).toBeInTheDocument();
            expect(screen.getByText("Categoria 2")).toBeInTheDocument();
        });
    });

    it("filtra por nombre", async () => {
        render(
            <MemoryRouter>
                <CategoriaAuditoria />
            </MemoryRouter>
        );
        await waitFor(() => screen.getByText("Categoria 1"));
        fireEvent.change(screen.getByPlaceholderText(/Buscar por nombre/i), {
            target: { value: "2" },
        });
        expect(screen.queryByText("Categoria 1")).not.toBeInTheDocument();
        expect(screen.getByText("Categoria 2")).toBeInTheDocument();
    });

    it("llama a eliminarCategoria al hacer click en Eliminar", async () => {
        AXIOS_CLIENT.delete.mockResolvedValue({});
        render(
            <MemoryRouter>
                <CategoriaAuditoria />
            </MemoryRouter>
        );
        await waitFor(() => screen.getByText("Eliminar"));
        window.alert = jest.fn();
        fireEvent.click(screen.getByText("Eliminar"));
        await waitFor(() => {
            expect(AXIOS_CLIENT.delete).toHaveBeenCalledWith("/categorias/1");
            expect(window.alert).toHaveBeenCalledWith("CATEGORIA ELIMINADO CON ÉXITO");
        });
    });

    it("llama a activarCategoria al hacer click en Activar", async () => {
        AXIOS_CLIENT.put.mockResolvedValue({});
        render(
            <MemoryRouter>
                <CategoriaAuditoria />
            </MemoryRouter>
        );
        await waitFor(() => screen.getByText("Activar"));
        window.alert = jest.fn();
        fireEvent.click(screen.getByText("Activar"));
        await waitFor(() => {
            expect(AXIOS_CLIENT.put).toHaveBeenCalledWith("/categorias/recuperar/2");
            expect(window.alert).toHaveBeenCalledWith("CATEGORIA ACTIVADO CON ÉXITO");
        });
    });
});