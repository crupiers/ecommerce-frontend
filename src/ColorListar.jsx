import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient"
import {Table} from "react-bootstrap";
import {Form} from "react-bootstrap";

function ColorListar() {
    const url = "/colores";

    const [colores, setColores] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getColores();
    }, []);

    const getColores = async () => {
        try {
            const value = await AXIOS_CLIENT.get(url);
            setColores(value.data);
        } catch (error) {
            console.error("ERROR AL OBTENER COLORES", error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredColores = colores.filter(color =>
        color.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={"text-center mt-3"}>
            <h1>LISTA COLORES</h1>
            <Form.Control
                type="text"
                placeholder="Buscar por nombre"
                value={searchTerm}
                onChange={handleSearchChange}
                className={"mt-3"}
            />
            <Table className={"mt-3"} bordered>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                </tr>
                </thead>
                <tbody>
                {filteredColores.map((color, indice) => (
                    <tr key={indice}>
                        <td>{color.id}</td>
                        <td>{color.nombre}</td>
                        <td>{color.descripcion}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ColorListar;
