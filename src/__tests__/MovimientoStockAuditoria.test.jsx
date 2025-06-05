import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MovimientoStockAuditoria } from "../MovimientoStockAuditoria";
import { AXIOS_CLIENT } from "../lib/axiosClient";
import { MemoryRouter } from "react-router-dom";

jest.mock("../lib/axiosClient");

const movimientosMock = [
    {
        id: 1,
        cantidad: 10,
        motivo: "Reposición",
        tipoMovimiento: "ENTRADA",
        createdBy: "Admin",
        fechaMovimiento: "2024-01-01",
        horaMovimiento: "10:00",
    },
    {
        id: 2,
        cantidad: 5,
        motivo: "Venta",
        tipoMovimiento: "SALIDA",
        createdBy: "User",
        fechaMovimiento: "2024-01-02",
        horaMovimiento: "12:00",
    },
];

const productosMock = [
    {
        id: 100,
        nombre: "Zapatillas",
        movimientos: [{ id: 1 }]
    },
    {
        id: 200,
        nombre: "Remera",
        movimientos: [{ id: 2 }]
    }
];

describe("MovimientoStockAuditoria", () => {
    beforeEach(() => {
        AXIOS_CLIENT.get.mockImplementation((url) => {
            if (url === "/admin/movimientoStock/auditoria") {
                return Promise.resolve({ data: movimientosMock });
            }
            if (url === "/admin/productos/auditoria") {
                return Promise.resolve({ data: productosMock });
            }
            return Promise.resolve({ data: [] });
        });
    });

    it("renderiza el título y la tabla con los movimientos", async () => {
        render(
            <MemoryRouter>
                <MovimientoStockAuditoria />
            </MemoryRouter>
        );
        expect(screen.getByText(/AUDITORIA MOVIMIENTOS DE STOCK/i)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText("Zapatillas")).toBeInTheDocument();
            expect(screen.getByText("Remera")).toBeInTheDocument();
            expect(screen.getByText("Reposición")).toBeInTheDocument();
            expect(screen.getByText("Venta")).toBeInTheDocument();
        });
    });

    it("filtra por Id de movimiento", async () => {
        render(
            <MemoryRouter>
                <MovimientoStockAuditoria />
            </MemoryRouter>
        );
        await waitFor(() => screen.getByText("Zapatillas"));
        fireEvent.change(screen.getByPlaceholderText(/Buscar por Id/i), {
            target: { value: "2" },
        });
        expect(screen.queryByText("Zapatillas")).not.toBeInTheDocument();
        expect(screen.getByText("Remera")).toBeInTheDocument();
    });

    it("filtra por nombre de producto asociado", async () => {
        render(
            <MemoryRouter>
                <MovimientoStockAuditoria />
            </MemoryRouter>
        );
        await waitFor(() => screen.getByText("Zapatillas"));
        fireEvent.change(screen.getByPlaceholderText(/Buscar por nombre del producto asociado/i), {
            target: { value: "zapatillas" },
        });
        expect(screen.getByText("Zapatillas")).toBeInTheDocument();
        expect(screen.queryByText("Remera")).not.toBeInTheDocument();
    });
});