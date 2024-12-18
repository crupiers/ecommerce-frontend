import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ColorRegistrar from "./ColorRegistrar";
import MarcaRegistrar from "./MarcaRegistrar";
import CategoriaRegistrar from "./CategoriaRegistrar";
import TamanioRegistrar from "./TamanioRegistrar";
import MarcaListar from "./MarcaListar";
import ColorListar from "./ColorListar";
import CategoriaListar from "./CategoriaListar";
import TamanioListar from "./TamanioListar";
import {ProtectedRoute} from "./ProtectedRoute";
import {AuthRoutes} from "./AuthRoutes";
import {AppLayout} from "./AppLayout";
import UsuarioActualizar from "./UsuarioActualizar.jsx";
import {ColorAuditoria} from "./ColorAuditoria.jsx";
import {CategoriaAuditoria} from "./CategoriaAuditoria.jsx";
import {TamanioAuditoria} from "./TamanioAuditoria.jsx";
import {MarcaAuditoria} from "./MarcaAuditoria.jsx";
import MovimientoStockRegistrar from "./MovimientoStockRegistrar.jsx";
import {ProductoRegistrar} from "./ProductoRegistrar.jsx";
import {ProductoListar} from "./ProductoListar.jsx";
import {ProductoAuditoria} from "./ProductoAuditoria.jsx";
import {MovimientoStockAuditoria} from "./MovimientoStockAuditoria.jsx";
import {Catalogo} from "./Catalogo.jsx";
import {Carrito} from "./Carrito.jsx";
import {UsuarioPedidos} from "./UsuarioPedidos.jsx";
import {PedidoAuditoria} from "./PedidoAuditoria.jsx";
import {EstadisticasUsuario} from "./EstadisticasUsuario.jsx";
import {EstadisticasAdmin} from "./EstadisticasAdmin.jsx";
import { ProductoActualizar } from "./ProductoActualizar.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path={"/"}
                    element={
                        <ProtectedRoute>
                            <AppLayout/>
                        </ProtectedRoute>
                    }
                >
                    <Route path="/colores/registrar" element={<ColorRegistrar/>}/>
                    <Route path="/colores/listar" element={<ColorListar/>}/>
                    <Route path="/colores/auditoria" element={<ColorAuditoria/>}/>
                    <Route path="/categorias/registrar" element={<CategoriaRegistrar/>}/>
                    <Route path="/categorias/listar" element={<CategoriaListar/>}/>
                    <Route path="/categorias/auditoria" element={<CategoriaAuditoria/>}/>
                    <Route path="/tamanios/registrar" element={<TamanioRegistrar/>}/>
                    <Route path="/tamanios/listar" element={<TamanioListar/>}/>
                    <Route path="/tamanios/auditoria" element={<TamanioAuditoria/>}/>
                    <Route path="/marcas/registrar" element={<MarcaRegistrar/>}/>
                    <Route path="/marcas/listar" element={<MarcaListar/>}/>
                    <Route path="/marcas/auditoria" element={<MarcaAuditoria/>}/>
                    <Route path="/usuarios/actualizar" element={<UsuarioActualizar/>}/>
                    <Route path="/productos/movimientoStock" element={<MovimientoStockRegistrar/>}/>
                    <Route path="/productos/movimientoStock/auditoria" element={<MovimientoStockAuditoria/>}/>
                    <Route path="/productos/registrar" element={<ProductoRegistrar/>}/>
                    <Route path="/productos/listar" element={<ProductoListar/>}/>
                    <Route path="/productos/auditoria" element={<ProductoAuditoria/>}/>
                    <Route path="/catalogo" element={<Catalogo/>}/>
                    <Route path="/carrito" element={<Carrito/>}/>
                    <Route path="/usuarios/pedidos" element={<UsuarioPedidos/>}/>
                    <Route path="/pedidos/auditoria" element={<PedidoAuditoria/>}/>
                    <Route path="/estadisticas" element={<EstadisticasUsuario/>}/>
                    <Route path="/estadisticas/admin" element={<EstadisticasAdmin/>}/>
                    <Route path="/productos/actualizar/:id" element={<ProductoActualizar/>}/>
                </Route>
                <Route path={"/auth/*"} element={<AuthRoutes/>}/>
            </Routes>
        </Router>
    );
}

export default App;
