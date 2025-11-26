import { useEffect, useState } from "react";
import { api } from "../../Services/Api";
import Layout from "../../components/Layout";

export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const controller = new AbortController(); // 👉 cria o abort controller
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.papel !== 0 ) {
      alert("Acesso negado! Apenas administradores podem acessar esta página.");
      window.location.href = "/PaginaInicialAdm";
      return;
    }


    api.get("/usuarios", { signal: controller.signal })
      .then((res) => setUsuarios(res.data))
      .catch((err) => {
        if (err.name === "CanceledError") return; // requisição cancelada
        console.error("Erro ao buscar usuarios:", err);
      });

    return () => {
      controller.abort(); // 👉 cancela a requisição ao desmontar o componente
    };
  }, []);

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
            </tr>
          </thead>

          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">Carregando...</td>
              </tr>
            ) : (
              usuarios.map((usu) => (
                <tr key={usu.id}>
                  <td>{usu.nome}</td>
                  <td>{usu.email}</td>
                  <td>
                    {usu.papel === 0
                      ? "Administrador"
                      : usu.papel === 1
                        ? "Funcionário da Saúde"
                        : "Clínica"}
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
