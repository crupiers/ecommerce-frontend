// src/__tests__/EstadisticasUsuario.test.jsx
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { EstadisticasUsuario } from "../EstadisticasUsuario";
import { AXIOS_CLIENT } from "../lib/axiosClient";

jest.mock("../lib/axiosClient");

beforeAll(() => {
    // Mock de localStorage para userId
    Object.defineProperty(window, "localStorage", {
        value: {
            getItem: jest.fn(() => "123"),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn(),
        },
        writable: true,
    });
});

const productosMock = [
    { id: 1, nombre: "Zapatillas", nombreMarca: "Nike", nombreCategoria: "Calzado" },
    { id: 2, nombre: "Remera", nombreMarca: "Adidas", nombreCategoria: "Ropa" }
];

const pedidosMock = [
    { id: 1, fechaPedido: "01/06/2024", idDetallesPedido: [101, 102] }
];

const detallesPedidosMock = [
    { id: 101, idProducto: 1, cantidad: 2, subtotal: 2000 },
    { id: 102, idProducto: 2, cantidad: 1, subtotal: 500 }
];

describe("EstadisticasUsuario", () => {
    beforeEach(() => {
        AXIOS_CLIENT.get.mockImplementation((url) => {
            if (url.startsWith("/pedidos/porUsuario/")) return Promise.resolve({ data: pedidosMock });
            if (url === "/detallesPedidos") return Promise.resolve({ data: detallesPedidosMock });
            if (url === "/productos") return Promise.resolve({ data: productosMock });
            return Promise.resolve({ data: [] });
        });
    });

    it("renderiza el título y muestra mensaje si no hay fechas", async () => {
        render(<EstadisticasUsuario />);
        expect(screen.getByText(/ESTADÍSTICAS/i)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText(/Por favor, ingresar una fecha válida/i)).toBeInTheDocument();
        });
    });

    it("muestra los gráficos al ingresar fechas válidas", async () => {
        const { container } = render(<EstadisticasUsuario />);
        // Selecciona los inputs de fecha por su tipo
        const dateInputs = container.querySelectorAll('input[type="date"]');
        fireEvent.change(dateInputs[0], { target: { value: "2024-06-01" } });
        fireEvent.change(dateInputs[1], { target: { value: "2024-06-30" } });
        // Espera a que se rendericen los canvas de los gráficos
        await waitFor(() => {
            // Espera al menos un gráfico (canvas)
            expect(container.querySelectorAll("canvas").length).toBeGreaterThan(0);
        });
    });
});