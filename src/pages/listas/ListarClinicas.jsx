import { useEffect, useState } from "react";
import { api } from "../../Services/Api";
import Layout from "../../components/Layout";


export default function ListarClinicas() {
  const [clinica, setClinicas] = useState([])
  const [papel, setPapel] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    api.get("/usuarios/me", { signal: controller.signal })
      .then((res) => {
        const { papel } = res.data;

        setPapel(papel);

        if (![0, 2, 3].includes(papel)) {
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

  async function inativarClinica(id) {

    try {
      await api.patch(`/clinica/${id}/ativo`, {
        ativo: false
      });
      alert("Excluido com sucesso!");
      setClinicas((prev) => prev.filter((cl) => cl.id !== id));
    } catch (err) {
      console.error("Erro ao exlcluir!:", err.response?.data || err);
      alert("Erro ao excluir clinica");
    }
  }

  async function ativarClinica(id) {

    try {
      await api.patch(`/clinica/${id}/ativo`, {
        ativo: true
      });
      alert("Reativada com sucesso!");
      setClinicas((prev) => prev.filter((cl) => cl.id !== id));
    } catch (err) {
      console.error("Erro ao excluir!:", err.response?.data || err);
      alert("Erro ao excluir clinica");
    }
  }

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
              <th>Inativar Clinica</th>
            </tr>
          </thead>

          <tbody>
            {clinica.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Carregando...
                </td>
              </tr>
            ) : papel !== 3 ? (
              clinica.filter((cl) => cl.ativo).map((cl) => (
                <tr key={cl.id}>
                  <td>{cl.nome}</td>
                  <td>{cl.telefone}</td>
                  <td>{cl.endereco}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => inativarClinica(cl.id)}
                      disabled={papel === 2}
                    >
                      Inativar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              clinica.map((cl) => (
                <tr key={cl.id}>
                  <td>{cl.nome}</td>
                  <td>{cl.telefone}</td>
                  <td>{cl.endereco}</td>
                  <td>
                    {cl.ativo ? (
                      <button
                        className="btn btn-danger"
                        onClick={() => inativarClinica(cl.id)}
                      >
                        Inativar
                      </button>
                    ) : (
                      <button
                        className="btn btn-secondary"
                        onClick={() => ativarClinica(cl.id)}
                      >
                        Ativar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )
            }
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
