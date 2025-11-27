import { useEffect, useState } from "react";
import { api } from "../../Services/Api";
import Layout from "../../components/Layout";

export default function ListarClinicas() {
  const [clinica, setClinicas] = useState([]);

  useEffect(() => {
  const controller = new AbortController();

  api.get("/usuarios/me", { signal: controller.signal })
    .then((res) => {
      const { papel } = res.data;

      if (![0, 1, 2].includes(papel)) {
        alert("Acesso negado!");
        window.location.href = "/PaginaInicialAdm";
        return;
      }

      return api.get("/clinica", { signal: controller.signal });
    })
    .then((res) => {
      if (res) setClinicas(res.data);
    })
    .catch((err) => {
      if (err.name !== "CanceledError") {
        console.error(err);
        window.location.href = "/";
      }
    });

  return () => controller.abort();
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
