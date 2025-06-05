import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ColorAuditoria } from "../ColorAuditoria";
import { AXIOS_CLIENT } from "../lib/axiosClient";
import { MemoryRouter } from "react-router-dom";

jest.mock("../lib/axiosClient");

const coloresMock = [
    {
        id: 1,
        nombre: "Rojo",
        descripcion: "Color rojo",
        createdBy: "Admin",
        createdAt: "2024-01-01",
        updatedBy: "Admin",
        updatedAt: "2024-01-02",
        deletedAt: null,
        estado: 0,
    },
    {
        id: 2,
        nombre: "Azul",
        descripcion: "Color azul",
        createdBy: "User",
        createdAt: "2024-01-03",
        updatedBy: "User",
        updatedAt: "2024-01-04",
        deletedAt: "2024-02-01",
        estado: 1,
    },
];

describe("ColorAuditoria", () => {
    beforeEach(() => {
        AXIOS_CLIENT.get.mockResolvedValue({ data: coloresMock });
    });

    it("renderiza el título y la tabla", async () => {
        render(
            <MemoryRouter>
                <ColorAuditoria />
            </MemoryRouter>
        );
        expect(screen.getByText(/AUDITORIA COLORES/i)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText("Rojo")).toBeInTheDocument();
            expect(screen.getByText("Azul")).toBeInTheDocument();
        });
    });

    it("filtra por nombre", async () => {
        render(
            <MemoryRouter>
                <ColorAuditoria />
            </MemoryRouter>
        );
        await waitFor(() => screen.getByText("Rojo"));
        fireEvent.change(screen.getByPlaceholderText(/Buscar por nombre/i), {
            target: { value: "Azul" },
        });
        expect(screen.queryByText("Rojo")).not.toBeInTheDocument();
        expect(screen.getByText("Azul")).toBeInTheDocument();
    });

    it("llama a eliminarColor al hacer click en Eliminar", async () => {
        AXIOS_CLIENT.delete.mockResolvedValue({});
        render(
            <MemoryRouter>
                <ColorAuditoria />
            </MemoryRouter>
        );
        await waitFor(() => screen.getByText("Eliminar"));
        window.alert = jest.fn();
        fireEvent.click(screen.getByText("Eliminar"));
        await waitFor(() => {
            expect(AXIOS_CLIENT.delete).toHaveBeenCalledWith("/colores/1");
            expect(window.alert).toHaveBeenCalledWith("COLOR ELIMINADO CON ÉXITO");
        });
    });

    it("llama a activarColor al hacer click en Activar", async () => {
        AXIOS_CLIENT.put.mockResolvedValue({});
        render(
            <MemoryRouter>
                <ColorAuditoria />
            </MemoryRouter>
        );
        await waitFor(() => screen.getByText("Activar"));
        window.alert = jest.fn();
        fireEvent.click(screen.getByText("Activar"));
        await waitFor(() => {
            expect(AXIOS_CLIENT.put).toHaveBeenCalledWith("/colores/recuperar/2");
            expect(window.alert).toHaveBeenCalledWith("COLOR ACTIVADO CON ÉXITO");
        });
    });
});