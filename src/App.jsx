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
                    <Route path="/admin/colores" element={<ColorAuditoria/>}/>
                    <Route path="/categorias/registrar" element={<CategoriaRegistrar/>}/>
                    <Route path="/categorias/listar" element={<CategoriaListar/>}/>
                    <Route path="/tamanios/registrar" element={<TamanioRegistrar/>}/>
                    <Route path="/tamanios/listar" element={<TamanioListar/>}/>
                    <Route path="/marcas/registrar" element={<MarcaRegistrar/>}/>
                    <Route path="/marcas/listar" element={<MarcaListar/>}/>
                    <Route path="/usuarios/actualizar" element={<UsuarioActualizar/>}/>
                </Route>
                <Route path={"/auth/*"} element={<AuthRoutes/>}/>
            </Routes>
        </Router>
    );
}

export default App;
