import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RegisterPage } from "../RegisterPage";
import { MemoryRouter } from "react-router-dom";
import { AXIOS_CLIENT } from "../lib/axiosClient";

// Mock para react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate
}));

// Mock para axios
jest.mock("../lib/axiosClient");

describe("RegisterPage", () => {
    beforeEach(() => {
        // Limpiar mocks antes de cada test
        jest.clearAllMocks();

        // Mock localStorage
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(),
                setItem: jest.fn(),
                removeItem: jest.fn(),
                clear: jest.fn(),
            },
            writable: true
        });
    });

    it("renderiza el formulario de registro correctamente", () => {
        render(
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        );

        expect(screen.getByText("Registro de Usuario")).toBeInTheDocument();
        expect(screen.getByText("Usuario")).toBeInTheDocument();
        expect(screen.getByText("Contraseña")).toBeInTheDocument();
        expect(screen.getByRole("textbox")).toBeInTheDocument();
        expect(screen.getByText("Registrar Usuario")).toBeInTheDocument();
        expect(screen.getByText(/¿Ya tienes una cuenta\? Logueate aquí/i)).toBeInTheDocument();
    });

    it("actualiza los inputs cuando el usuario escribe", () => {
        render(
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        );

        // Seleccionar por rol o tipo en lugar de por label
        const nombreInput = screen.getByRole("textbox");
        const passwordInput = screen.getByRole("button").form.querySelector('input[type="password"]');

        fireEvent.change(nombreInput, { target: { value: "usuario_test" } });
        fireEvent.change(passwordInput, { target: { value: "clave123" } });

        expect(nombreInput.value).toBe("usuario_test");
        expect(passwordInput.value).toBe("clave123");
    });

    it("envía el formulario y guarda datos en localStorage al registrarse exitosamente", async () => {
        // Mock para simular una respuesta exitosa
        AXIOS_CLIENT.post.mockResolvedValueOnce({
            data: {
                jwt: "token-test",
                id: "123",
                rol: "USER",
                nombre: "usuario_test"
            }
        });

        render(
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        );

        const nombreInput = screen.getByRole("textbox");
        const passwordInput = screen.getByRole("button").form.querySelector('input[type="password"]');
        const submitButton = screen.getByText("Registrar Usuario");

        fireEvent.change(nombreInput, { target: { value: "usuario_test" } });
        fireEvent.change(passwordInput, { target: { value: "clave123" } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(AXIOS_CLIENT.post).toHaveBeenCalledWith("/auth/register", {
                nombre: "usuario_test",
                contrasenia: "clave123",
                fechaNacimiento: expect.any(Date)
            });

            expect(localStorage.setItem).toHaveBeenCalledWith("token", "token-test");
            expect(localStorage.setItem).toHaveBeenCalledWith("userId", "123");
            expect(localStorage.setItem).toHaveBeenCalledWith("role", "USER");
            expect(localStorage.setItem).toHaveBeenCalledWith("username", "usuario_test");

            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });

    /**
    it("muestra alerta cuando hay un error en el registro", async () => {
        // Mock para simular un error en la respuesta
        const mockError = {
            response: {
                data: {
                    details: ["El nombre de usuario ya existe", "La contraseña es demasiado corta"]
                }
            }
        };
        AXIOS_CLIENT.post.mockRejectedValueOnce(mockError);

        // Mock para window.alert
        const mockAlert = jest.spyOn(window, "alert").mockImplementation();

        render(
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        );

        const nombreInput = screen.getByRole("textbox");
        const passwordInput = screen.getByRole("button").form.querySelector('input[type="password"]');
        const submitButton = screen.getByText("Registrar Usuario");

        fireEvent.change(nombreInput, { target: { value: "usuario_test" } });
        fireEvent.change(passwordInput, { target: { value: "clave123" } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockAlert).toHaveBeenCalledWith(expect.stringContaining("ERROR AL REGISTRAR USUARIO"));
            expect(mockAlert).toHaveBeenCalledWith(expect.stringContaining("El nombre de usuario ya existe"));
            expect(mockAlert).toHaveBeenCalledWith(expect.stringContaining("La contraseña es demasiado corta"));
            expect(mockNavigate).not.toHaveBeenCalled();
        });

        mockAlert.mockRestore();
    });
    */

    it("verifica que el enlace de login apunta a la ruta correcta", () => {
        render(
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        );

        const loginLink = screen.getByText(/¿Ya tienes una cuenta\? Logueate aquí/i);
        expect(loginLink).toHaveAttribute("href", "/auth/login");
    });
});