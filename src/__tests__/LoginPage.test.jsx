// src/__tests__/LoginPage.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginPage } from "../LoginPage";
import { AXIOS_CLIENT } from "../lib/axiosClient";
import { useNavigate } from "react-router-dom";

// Mock de react-router-dom
jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

// Mock del cliente axios
jest.mock("../lib/axiosClient");

describe("LoginPage", () => {
    const navigateMock = jest.fn();

    beforeEach(() => {
        useNavigate.mockReturnValue(navigateMock);

        // Limpia el localStorage antes de cada test
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(),
                setItem: jest.fn(),
                removeItem: jest.fn(),
                clear: jest.fn(),
            },
            writable: true,
        });
    });

    it("renderiza el formulario de login correctamente", () => {
        render(<LoginPage />);

        expect(screen.getByText("LOGIN")).toBeInTheDocument();
        // Verificar labels en lugar de inputs por label
        expect(screen.getByText("NOMBRE DE USUARIO")).toBeInTheDocument();
        expect(screen.getByText("CONTRASEÑA")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "INICIAR SESIÓN" })).toBeInTheDocument();
        expect(screen.getByText("¿No tienes una cuenta? Registrate aquí")).toBeInTheDocument();
    });

    it("maneja el inicio de sesión exitoso", async () => {
        const mockResponse = {
            data: {
                jwt: "token-123",
                id: "user-123",
                rol: "CLIENTE",
                nombre: "usuario_test"
            }
        };
        AXIOS_CLIENT.post.mockResolvedValueOnce(mockResponse);

        const { container } = render(<LoginPage />);

        // Seleccionar por tipo y nombre
        const nombreInput = container.querySelector('input[name="nombre"]');
        const contraseniaInput = container.querySelector('input[name="contrasenia"]');

        fireEvent.change(nombreInput, { target: { value: "usuario_test" } });
        fireEvent.change(contraseniaInput, { target: { value: "password123" } });
        fireEvent.click(screen.getByRole("button", { name: "INICIAR SESIÓN" }));

        await waitFor(() => {
            // Verifica que localStorage almacene los datos correctos
            expect(localStorage.setItem).toHaveBeenCalledWith("token", "token-123");
            expect(localStorage.setItem).toHaveBeenCalledWith("userId", "user-123");
            expect(localStorage.setItem).toHaveBeenCalledWith("role", "CLIENTE");
            expect(localStorage.setItem).toHaveBeenCalledWith("username", "usuario_test");
            // Verifica que la navegación sea a la página correcta
            expect(navigateMock).toHaveBeenCalledWith("/catalogo");
        });
    });

    it("muestra mensaje de error cuando las credenciales son incorrectas", async () => {
        // Resetea todos los mocks
        jest.clearAllMocks();

        // Usa mockRejectedValueOnce para asegurar que rechace solo una vez
        AXIOS_CLIENT.post.mockRejectedValueOnce(new Error("Invalid credentials"));

        const { container } = render(<LoginPage />);

        const nombreInput = container.querySelector('input[name="nombre"]');
        const contraseniaInput = container.querySelector('input[name="contrasenia"]');

        fireEvent.change(nombreInput, { target: { value: "usuario_incorrecto" } });
        fireEvent.change(contraseniaInput, { target: { value: "password_incorrecta" } });

        // Envía el formulario
        fireEvent.submit(container.querySelector('form'));

        // Espera a que aparezca el mensaje de error
        await waitFor(() => {
            expect(screen.getByText("USUARIO O CONTRASEÑA INCORRECTOS")).toBeInTheDocument();
        });

        // Verifica que navigate no fue llamado
        expect(navigateMock).not.toHaveBeenCalled();
    });
});