import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { TamanioAuditoria } from "../TamanioAuditoria";
import { AXIOS_CLIENT } from "../lib/axiosClient";

jest.mock("../lib/axiosClient");

describe("TamanioAuditoria", () => {
    const tamaniosMock = [
        {
            id: 1,
            nombre: "Grande",
            descripcion: "Tamaño grande",
            createdBy: "admin",
            createdAt: "2024-01-01",
            updatedBy: "admin",
            updatedAt: "2024-01-02",
            deletedAt: null,
            estado: 0,
        },
        {
            id: 2,
            nombre: "Pequeño",
            descripcion: "Tamaño pequeño",
            createdBy: "admin",
            createdAt: "2024-01-01",
            updatedBy: "admin",
            updatedAt: "2024-01-02",
            deletedAt: "2024-02-01",
            estado: 1,
        },
    ];

    beforeEach(() => {
        AXIOS_CLIENT.get.mockResolvedValue({ data: tamaniosMock });
    });

    it("renderiza la tabla de tamaños", async () => {
        render(
            <MemoryRouter>
                <TamanioAuditoria />
            </MemoryRouter>
        );
        expect(await screen.findByText("AUDITORIA TAMAÑOS")).toBeInTheDocument();
        expect(await screen.findByText("Grande")).toBeInTheDocument();
        expect(await screen.findByText("Pequeño")).toBeInTheDocument();
    });

    it("filtra tamaños por nombre", async () => {
        render(
            <MemoryRouter>
                <TamanioAuditoria />
            </MemoryRouter>
        );
        await screen.findByText("Grande");
        fireEvent.change(screen.getByPlaceholderText("Buscar por nombre"), {
            target: { value: "grande" },
        });
        expect(screen.getByText("Grande")).toBeInTheDocument();
        expect(screen.queryByText("Pequeño")).not.toBeInTheDocument();
    });

    it("llama a eliminarTamanio al hacer click en Eliminar", async () => {
        AXIOS_CLIENT.delete.mockResolvedValue({});
        window.alert = jest.fn();
        render(
            <MemoryRouter>
                <TamanioAuditoria />
            </MemoryRouter>
        );
        await screen.findByText("Grande");
        fireEvent.click(screen.getByText("Eliminar"));
        await waitFor(() => expect(AXIOS_CLIENT.delete).toHaveBeenCalled());
        expect(window.alert).toHaveBeenCalledWith("TAMAÑO ELIMINADO CON ÉXITO");
    });

    it("llama a activarTamanio al hacer click en Activar", async () => {
        AXIOS_CLIENT.put.mockResolvedValue({});
        window.alert = jest.fn();
        render(
            <MemoryRouter>
                <TamanioAuditoria />
            </MemoryRouter>
        );
        await screen.findByText("Pequeño");
        fireEvent.click(screen.getByText("Activar"));
        await waitFor(() => expect(AXIOS_CLIENT.put).toHaveBeenCalled());
        expect(window.alert).toHaveBeenCalledWith("TAMAÑO ACTIVADO CON ÉXITO");
    });
});