import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient"
import {Table} from "react-bootstrap";
import {Form} from "react-bootstrap";

function TamanioListar() {
    const url = "/tamanios";

    const [tamanios, setTamanios] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getTamanios();
    }, []);

    const getTamanios = async () => {
        try {
            const value = await AXIOS_CLIENT.get(url);
            setTamanios(value.data);
        } catch (error) {
            console.error("ERROR AL OBTENER TAMAÑOS", error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTamanios = tamanios.filter(tamanio =>
        tamanio.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={"text-center mt-3"}>
            <h1>LISTA TAMAÑOS</h1>
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
                {filteredTamanios.map((tamanio, indice) => (
                    <tr key={indice}>
                        <td>{tamanio.id}</td>
                        <td>{tamanio.nombre}</td>
                        <td>{tamanio.descripcion}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default TamanioListar