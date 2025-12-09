import { useEffect, useState } from "react";
import { api } from "../../Services/Api";
import Layout from "../../components/Layout";

export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [papel, setPapel] = useState(null);


  /*useEffect(() => {
    const controller = new AbortController();

    api.get("/usuarios/me", { signal: controller.signal })
      .then((res) => {
        const { papel } = res.data;
        setPapel(papel);

        if (![0, 3].includes(papel)) {
          alert("Acesso negado!");
          window.location.href = "/PaginaInicialAdm";
          return;
        }

        return api.get("/usuarios", { signal: controller.signal });
      })
      .then((res) => {
        if (res) setUsuarios(res.data);
      })
      .catch((err) => {
        if (err.name !== "CanceledError") {
          console.error(err);
          window.location.href = "/";
        }
      });*/

    return () => controller.abort();
  }, []);

  async function inativarUsuario(id) {

    try {
      await api.patch(`/usuarios/${id}/ativo`, {
        ativo: false
      });
      alert("Excluido com sucesso!");
      setUsuarios((prev) => prev.filter((usu) => usu.id !== id));
    } catch (err) {
      console.error("Erro ao excluir!:", err.response?.data || err);
      alert("Erro ao excluir usuario");
    }
  }

  async function ativarUsuario(id) {

    try {
      await api.patch(`/usuarios/${id}/ativo`, {
        ativo: true
      });
      alert("Ativado com sucesso!");
      setUsuarios((prev) => prev.filter((usu) => usu.id !== id));
    } catch (err) {
      console.error("Erro ao ativar!:", err.response?.data || err);
      alert("Erro ao ativar usuario");
    }
  }

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="mb-4 text-primary">Lista de usuários</h2>

        <table className="table table-striped table-bordered shadow">
          <thead className="table-dark">
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Papel</th>
              <th>Excluir</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">Carregando...</td>
              </tr>
            ) : papel !== 3 ? (
              usuarios.filter((usu) => usu.ativo).map((usu) => (
                <tr key={usu.id}>
                  <td>{usu.nome}</td>
                  <td>{usu.email}</td>
                  <td>
                    {usu.papel === 0
                      ? "Administrador"
                      : usu.papel === 1
                        ? "Funcionário da Saúde"
                        : usu.papel === 2
                          ? "Clínica"
                          : "Master"}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => inativarUsuario(usu.id)}
                    >Deletar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              usuarios.map((usu) => (
                <tr key={usu.id}>
                  <td>{usu.nome}</td>
                  <td>{usu.email}</td>
                  <td> {usu.papel === 0
                    ? "Administrador"
                    : usu.papel === 1
                      ? "Funcionário da Saúde"
                      : usu.papel === 2
                        ? "Clínica"
                        : "Master"}</td>
                  <td>
                    {usu.ativo ? (
                      <button
                        className="btn btn-danger"
                        onClick={() => inativarUsuario(usu.id)}
                      >
                        Inativar
                      </button>
                    ) : (
                      <button
                        className="btn btn-secondary"
                        onClick={() => ativarUsuario(usu.id)}
                      >
                        Ativar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
