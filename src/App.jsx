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
import  ColorActualizar  from "./ColorActualizar.jsx";
import CategoriaActualizar  from "./CategoriaActualizar.jsx";
import  MarcaActualizar  from "./MarcaActualizar.jsx";
import  TamanioActualizar  from "./TamanioActualizar.jsx";
import { AdminRoute } from "./AdminRoute.js";

function App() {
    return (
        <Router>
            <Routes>
                #home, protego la ruta para que se vea si tengo cuenta
                #sobre esta raiz pongo las demas rutas que no sean de logueo
                <Route
                    path={"/"}
                    element={
                        <ProtectedRoute>
                            <AppLayout/>
                        </ProtectedRoute>
                    }
                >

                    #colores, dejo las rutas de administracion para admins
                    <Route path="/colores/registrar" element={
                        <AdminRoute>
                            <ColorRegistrar/>
                        </AdminRoute>
                        }/>
                    <Route path="/colores/listar" element={
                        <AdminRoute>
                            <ColorListar/>
                        </AdminRoute>
                        }/>
                    <Route path="/colores/auditoria" element={
                        <AdminRoute>
                            <ColorAuditoria/>
                        </AdminRoute>
                        }/>
                    <Route path="/colores/actualizar/:id" element={
                        <AdminRoute>
                            <ColorActualizar/>
                        </AdminRoute>
                        }/>
                    
                    #categorias
                    <Route path="/categorias/registrar" element={
                        <AdminRoute>
                            <CategoriaRegistrar/>
                        </AdminRoute>
                        }/>
                    <Route path="/categorias/listar" element={
                        <AdminRoute>
                            <CategoriaListar/>
                        </AdminRoute>
                        }/>
                    <Route path="/categorias/auditoria" element={
                        <AdminRoute>
                            <CategoriaAuditoria/>
                        </AdminRoute>
                        }/>
                    <Route path="/categorias/actualizar/:id" element={
                        <AdminRoute>
                            <CategoriaActualizar/>
                        </AdminRoute>
                        }/>

                    #tamanios
                    <Route path="/tamanios/registrar" element={
                        <AdminRoute>
                            <TamanioRegistrar/>
                        </AdminRoute>
                        }/>
                    <Route path="/tamanios/listar" element={
                        <AdminRoute>
                            <TamanioListar/>
                        </AdminRoute>
                        }/>
                    <Route path="/tamanios/auditoria" element={
                        <AdminRoute>
                            <TamanioAuditoria/>
                        </AdminRoute>
                        }/>
                    <Route path="/tamanios/actualizar/:id" element={
                        <AdminRoute>
                            <TamanioActualizar/>
                        </AdminRoute>
                        }/>
                    
                    #marcas
                    <Route path="/marcas/registrar" element={
                        <AdminRoute>
                            <MarcaRegistrar/>
                        </AdminRoute>
                        }/>
                    <Route path="/marcas/listar" element={
                        <AdminRoute>
                            <MarcaListar/>
                        </AdminRoute>
                        }/>
                    <Route path="/marcas/auditoria" element={
                        <AdminRoute>
                            <MarcaAuditoria/>
                        </AdminRoute>
                        }/>
                    <Route path="/marcas/actualizar/:id" element={
                        <AdminRoute>
                            <MarcaActualizar/>
                        </AdminRoute>
                        }/>
                    
                    #productos
                    <Route path="/productos/registrar" element={
                        <AdminRoute>
                            <ProductoRegistrar/>
                        </AdminRoute>
                        }/>
                    <Route path="/productos/listar" element={
                        <AdminRoute>
                            <ProductoListar/>
                        </AdminRoute>
                        }/>
                    <Route path="/productos/auditoria" element={
                        <AdminRoute>
                            <ProductoAuditoria/>
                        </AdminRoute>
                        }/>
                    <Route path="/productos/actualizar/:id" element={
                        <AdminRoute>
                            <ProductoActualizar/>
                        </AdminRoute>
                        }/>

                    #movimientosStock
                    <Route path="/productos/movimientoStock" element={
                        <AdminRoute>
                            <MovimientoStockRegistrar/>
                        </AdminRoute>
                        }/>
                    <Route path="/productos/movimientoStock/auditoria" element={
                        <AdminRoute>
                            <MovimientoStockAuditoria/>
                        </AdminRoute>
                        }/>

                    #compras
                    <Route path="/catalogo" element={<Catalogo/>}/>
                    <Route path="/carrito" element={<Carrito/>}/>
                    
                    #pedidos
                    <Route path="/usuarios/pedidos" element={<UsuarioPedidos/>}/>
                    <Route path="/pedidos/auditoria" element={
                        <AdminRoute>
                            <PedidoAuditoria/>
                        </AdminRoute>
                        }/>
                    
                    #estadisticas
                    <Route path="/estadisticas" element={<EstadisticasUsuario/>}/>
                    <Route path="/estadisticas/admin" element={
                        <AdminRoute>
                            <EstadisticasAdmin/>
                        </AdminRoute>
                        }/>
                    
                    #actualizarUsuario
                    <Route path="/usuarios/actualizar" element={<UsuarioActualizar/>}/>
                </Route>

                #rutas de logueo
                <Route path={"/auth/*"} element={<AuthRoutes/>}/>
            </Routes>
        </Router>
    );
}

export default App;
