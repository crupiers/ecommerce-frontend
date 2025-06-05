import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductoAuditoria } from "../ProductoAuditoria";
import { AXIOS_CLIENT } from "../lib/axiosClient";

jest.mock("../lib/axiosClient");

describe("ProductoAuditoria", () => {
    const productosMock = [
        {
            id: 1,
            nombre: "Producto 1",
            descripcion: "Desc 1",
            precio: 100,
            umbral: 10,
            stock: 5,
            nombreCategoria: "Cat 1",
            nombreMarca: "Marca 1",
            nombreTamanio: "Tamaño 1",
            nombreColor: "Rojo",
            codigoBarra: "123",
            movimientos: [],
            createdBy: "admin",
            createdAt: "2024-01-01",
            updatedBy: "admin",
            updatedAt: "2024-01-02",
            deletedAt: null,
            estado: 0,
        },
    ];

    beforeEach(() => {
        AXIOS_CLIENT.get.mockResolvedValue({ data: productosMock });
    });

    it("renderiza la tabla de productos", async () => {
        render(
            <MemoryRouter>
                <ProductoAuditoria />
            </MemoryRouter>
        );
        expect(await screen.findByText("AUDITORIA PRODUCTOS")).toBeInTheDocument();
        expect(await screen.findByText("Producto 1")).toBeInTheDocument();
    });

    it("filtra productos por nombre", async () => {
        render(
            <MemoryRouter>
                <ProductoAuditoria />
            </MemoryRouter>
        );
        await screen.findByText("Producto 1");
        fireEvent.change(screen.getByPlaceholderText("Buscar por nombre"), {
            target: { value: "noexiste" },
        });
        expect(screen.queryByText("Producto 1")).not.toBeInTheDocument();
    });

    it("llama a eliminarProducto al hacer click en Eliminar", async () => {
        AXIOS_CLIENT.delete.mockResolvedValue({});
        window.alert = jest.fn();
        render(
            <MemoryRouter>
                <ProductoAuditoria />
            </MemoryRouter>
        );
        await screen.findByText("Producto 1");
        fireEvent.click(screen.getByText("Eliminar"));
        await waitFor(() => expect(AXIOS_CLIENT.delete).toHaveBeenCalled());
        expect(window.alert).toHaveBeenCalledWith("PRODUCTO ELIMINADO CON ÉXITO");
    });
});