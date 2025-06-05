import React from "react";
import { render, screen } from "@testing-library/react";
import { ProtectedRoute } from "../ProtectedRoute";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("ProtectedRoute", () => {
    let localStorageMock;

    beforeEach(() => {
        // Configurar localStorage mock
        localStorageMock = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn(),
        };

        Object.defineProperty(window, "localStorage", {
            value: localStorageMock,
            writable: true,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renderiza el componente hijo cuando el token existe", () => {
        // Simular que existe un token
        localStorageMock.getItem.mockReturnValue("token-valido");

        render(
            <MemoryRouter initialEntries={["/ruta-protegida"]}>
                <Routes>
                    <Route
                        path="/ruta-protegida"
                        element={
                            <ProtectedRoute>
                                <div data-testid="componente-protegido">Contenido Protegido</div>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/auth/login" element={<div>Login</div>} />
                </Routes>
            </MemoryRouter>
        );

        // Verificar que el componente hijo se renderiza
        expect(screen.getByText("Contenido Protegido")).toBeInTheDocument();
        expect(screen.getByTestId("componente-protegido")).toBeInTheDocument();
        expect(screen.queryByText("Login")).not.toBeInTheDocument();
    });

    it("redirige a /auth/login cuando no hay token", () => {
        // Simular que no existe un token
        localStorageMock.getItem.mockReturnValue(null);

        render(
            <MemoryRouter initialEntries={["/ruta-protegida"]}>
                <Routes>
                    <Route
                        path="/ruta-protegida"
                        element={
                            <ProtectedRoute>
                                <div data-testid="componente-protegido">Contenido Protegido</div>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/auth/login" element={<div>Login</div>} />
                </Routes>
            </MemoryRouter>
        );

        // Verificar que redirige a login y no muestra el componente protegido
        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.queryByText("Contenido Protegido")).not.toBeInTheDocument();
        expect(screen.queryByTestId("componente-protegido")).not.toBeInTheDocument();
    });
});