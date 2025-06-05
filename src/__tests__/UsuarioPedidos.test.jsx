import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { UsuarioPedidos } from "../UsuarioPedidos";
import { AXIOS_CLIENT } from "../lib/axiosClient";

// Mock para axios
jest.mock("../lib/axiosClient");

describe("UsuarioPedidos", () => {
    // Datos de prueba
    const mockPedidos = [
        {
            id: 1,
            horaPedido: "15:30",
            fechaPedido: "2023-10-15",
            idDetallesPedido: [101, 102],
            total: 5000
        },
        {
            id: 2,
            horaPedido: "10:45",
            fechaPedido: "2023-10-16",
            idDetallesPedido: [103],
            total: 2500
        }
    ];

    const mockDetallesPedidos = [
        {
            id: 101,
            idProducto: 1001,
            cantidad: 2,
            subtotal: 3000
        },
        {
            id: 102,
            idProducto: 1002,
            cantidad: 1,
            subtotal: 2000
        },
        {
            id: 103,
            idProducto: 1003,
            cantidad: 1,
            subtotal: 2500
        }
    ];

    const mockProductos = [
        {
            id: 1001,
            nombre: "Camiseta Deportiva"
        },
        {
            id: 1002,
            nombre: "Zapatillas Running"
        },
        {
            id: 1003,
            nombre: "Chaleco Térmico"
        }
    ];

    beforeEach(() => {
        // Limpiar todos los mocks
        jest.clearAllMocks();

        // Mock de localStorage
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn().mockReturnValue("123"), // userId
                setItem: jest.fn(),
                removeItem: jest.fn(),
                clear: jest.fn()
            },
            writable: true
        });

        // Mock de las respuestas de axios
        AXIOS_CLIENT.get.mockImplementation((url) => {
            if (url.includes("/pedidos/porUsuario/")) {
                return Promise.resolve({ data: mockPedidos });
            } else if (url.includes("/detallesPedidos")) {
                return Promise.resolve({ data: mockDetallesPedidos });
            } else if (url.includes("/productos")) {
                return Promise.resolve({ data: mockProductos });
            }
            return Promise.reject(new Error("Not found"));
        });
    });

    it("renderiza correctamente la tabla de pedidos", async () => {
        render(<UsuarioPedidos />);

        // Verificar título
        expect(screen.getByText("PEDIDOS")).toBeInTheDocument();

        // Verificar que se muestren los encabezados de la tabla
        expect(screen.getByText("Id")).toBeInTheDocument();
        expect(screen.getByText("Hora pedido")).toBeInTheDocument();
        expect(screen.getByText("Fecha pedido")).toBeInTheDocument();
        expect(screen.getByText("Detalles")).toBeInTheDocument();
        expect(screen.getByText("Total")).toBeInTheDocument();

        // Verificar que se hagan las llamadas a la API
        expect(localStorage.getItem).toHaveBeenCalledWith("userId");
        expect(AXIOS_CLIENT.get).toHaveBeenCalledWith("/pedidos/porUsuario/123");
        expect(AXIOS_CLIENT.get).toHaveBeenCalledWith("/detallesPedidos");
        expect(AXIOS_CLIENT.get).toHaveBeenCalledWith("/productos");

        // Verificar que se muestren los datos de pedidos
        await waitFor(() => {
            expect(screen.getByText("15:30")).toBeInTheDocument();
            expect(screen.getByText("2023-10-15")).toBeInTheDocument();
            expect(screen.getByText("$5000")).toBeInTheDocument();
            expect(screen.getByText("10:45")).toBeInTheDocument();
            expect(screen.getByText("2023-10-16")).toBeInTheDocument();
            expect(screen.getByText("$2500")).toBeInTheDocument();
        });

        // Verificar que existan los botones "Ver Detalles"
        const botonesVerDetalles = screen.getAllByText("Ver Detalles");
        expect(botonesVerDetalles).toHaveLength(2);
    });

    it("muestra el modal con los detalles del pedido al hacer clic en 'Ver Detalles'", async () => {
        render(<UsuarioPedidos />);

        // Esperar a que carguen los datos
        await waitFor(() => {
            expect(screen.getAllByText("Ver Detalles")[0]).toBeInTheDocument();
        });

        // Hacer clic en el primer botón "Ver Detalles"
        fireEvent.click(screen.getAllByText("Ver Detalles")[0]);

        // Verificar que se muestre el modal
        expect(screen.getByText("Detalles del Pedido")).toBeInTheDocument();

        // Verificar que se muestren los encabezados del detalle
        expect(screen.getAllByText("Id")[1]).toBeInTheDocument();
        expect(screen.getByText("Producto")).toBeInTheDocument();
        expect(screen.getByText("Cantidad")).toBeInTheDocument();
        expect(screen.getByText("Subtotal")).toBeInTheDocument();

        // Verificar que se muestren los datos esperados en el modal
        expect(screen.getByText("Camiseta Deportiva")).toBeInTheDocument();
        expect(screen.getByText("Zapatillas Running")).toBeInTheDocument();

        // Verificar que se muestren los subtotales
        expect(screen.getByText("$3000")).toBeInTheDocument();
        expect(screen.getByText("$2000")).toBeInTheDocument();

        // Verificar que se muestren los IDs de los detalles
        expect(screen.getByText("101")).toBeInTheDocument();
        expect(screen.getByText("102")).toBeInTheDocument();

        // Verificar que exista el botón para cerrar
        expect(screen.getByText("Cerrar")).toBeInTheDocument();
    });

    it("cierra el modal al hacer clic en el botón 'Cerrar'", async () => {
        render(<UsuarioPedidos />);

        // Esperar a que carguen los datos
        await waitFor(() => {
            expect(screen.getAllByText("Ver Detalles")[0]).toBeInTheDocument();
        });

        // Abrir el modal
        fireEvent.click(screen.getAllByText("Ver Detalles")[0]);
        expect(screen.getByText("Detalles del Pedido")).toBeInTheDocument();

        // Cerrar el modal
        fireEvent.click(screen.getByText("Cerrar"));

        // Verificar que el modal ya no esté visible
        await waitFor(() => {
            expect(screen.queryByText("Detalles del Pedido")).not.toBeInTheDocument();
        });
    });

    it("muestra una alerta cuando hay un error al obtener los pedidos", async () => {
        // Mock para simular un error
        const mockError = {
            response: {
                data: {
                    message: "Error al obtener pedidos"
                }
            }
        };

        AXIOS_CLIENT.get.mockImplementation((url) => {
            if (url.includes("/pedidos/porUsuario/")) {
                return Promise.reject(mockError);
            } else if (url.includes("/detallesPedidos")) {
                return Promise.resolve({ data: mockDetallesPedidos });
            } else if (url.includes("/productos")) {
                return Promise.resolve({ data: mockProductos });
            }
            return Promise.reject(new Error("Not found"));
        });

        // Mock para window.alert
        const mockAlert = jest.spyOn(window, "alert").mockImplementation();

        render(<UsuarioPedidos />);

        // Verificar que se muestre la alerta de error
        await waitFor(() => {
            expect(mockAlert).toHaveBeenCalledWith("ERROR AL OBTENER PEDIDOS: \nError al obtener pedidos");
        });

        mockAlert.mockRestore();
    });
});