import { useEffect, useState } from "react";
import { api } from "../../Services/Api";
import Layout from "../../components/Layout";

export default function ListarClinicas() {
  const [clinica, setClinicas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const controller = new AbortController();

    if (!token) {
      window.location.href = "/";
      return;
    }

    api.get("/clinica", { signal: controller.signal })
      .then((res) => setClinicas(res.data))
      .catch((err) => {
        if (err.name === "CanceledError") return; 
        console.error("Erro ao buscar clinicas:", err);
      });


  return () => {
      controller.abort(); // 👉 cancela a requisição ao desmontar o componente
    };
  }, []);

  return (
    <Layout>
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">Lista de Clinicas</h2>

      <table className="table table-striped table-bordered shadow">
        <thead className="table-dark">
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Endereço</th>
          </tr>
        </thead>

        <tbody>
          {clinica.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                Carregando...
              </td>
            </tr>
          ) : (
            clinica.map((cl) => (
              <tr key={cl.id}>
                <td>{cl.nome}</td>
                <td>{cl.telefone}</td>
                <td>{cl.endereco}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </Layout>
  );
}
