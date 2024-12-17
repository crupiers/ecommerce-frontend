import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient"
import {Table} from "react-bootstrap";
import {Form} from "react-bootstrap";

function MarcaListar() {
    const url = "/marcas";

    const [marcas, setMarcas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getMarcas();
    }, []);

    const getMarcas = async () => {
        try {
            const value = await AXIOS_CLIENT.get(url);
            setMarcas(value.data);
        } catch (error) {
            console.error("ERROR AL OBTENER MARCAS", error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredMarcas = marcas.filter(marca =>
        marca.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={"text-center mt-3"}>
            <h1>LISTA MARCAS</h1>
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
                {filteredMarcas.map((marca, indice) => (
                    <tr key={indice}>
                        <td>{marca.id}</td>
                        <td>{marca.nombre}</td>
                        <td>{marca.descripcion}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default MarcaListar;
