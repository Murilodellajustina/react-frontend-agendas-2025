import { useEffect, useState } from "react";
import { api } from "../../Services/Api";
import Layout from "../../components/Layout";

const papeis = {
    0: "Administrador",
    1: "Funcionário da saúde",
    2: "Clínica",
};

export default function ListarUsuarios() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/";
            return;
        }

        api.get("/usuarios")
            .then((res) => setUsuarios(res.data))
            .catch((err) => console.error("Erro ao buscar usuarios:", err));
    }, []);

    return (
        <Layout>
            <div className="container mt-5">
                <h2 className="mb-4 text-primary">Lista de usuarios</h2>

                <table className="table table-striped table-bordered shadow">
                    <thead className="table-dark">
                        <tr>
                            <th>Nome</th>
                            <th>email</th>
                            <th>papel</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuarios.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Carregando...
                                </td>
                            </tr>
                        ) : (
                            usuarios.map((usu) => (
                                <tr key={usu.id}>
                                    <td>{usu.nome}</td>
                                    <td>{usu.email}</td>
                                    <td>{papeis[usu.papel]}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
