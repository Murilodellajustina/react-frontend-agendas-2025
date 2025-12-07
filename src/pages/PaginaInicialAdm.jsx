import Layout from "../components/Layout";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { api } from "../Services/Api";
import Img1 from "../Imagens/IMG1.png";
import Img2 from "../Imagens/IMG2.png";
import { Link } from "react-router-dom";

export default function PaginaInicialAdm() {
  const [nome, setNome] = useState("");
  const [papel, setPapel] = useState(null);

  useEffect(() => {
    api.get("/usuarios/me")
      .then((res) => {
        const { id, nome, papel } = res.data;

        if (![0, 1, 2, 3].includes(papel)) {
          alert("Acesso negado!");
          window.location.href = "/";
          return;
        }

        setPapel(papel);
        setNome(nome);
      })
      .catch((err) => {
        console.error("Erro ao buscar usuário:", err);
        window.location.href = "/";
      });
  }, []);

  return (
    <Layout>
      <div className="d-flex justify-content-center p-4">
        <h3>Seja bem vindo, {nome}</h3>
      </div>

      <div className="d-flex justify-content-between align-items-start p-4 gap-4 flex-wrap">

        <div className="d-flex flex-column gap-3" style={{ minWidth: "250px" }}>
          {(papel === 0 || papel === 2 || papel === 3) && (
            <Button as={Link} to="/RegistroAgendamento" variant="primary">
              Criar Agendamento
            </Button>
          )}
          {(papel === 0 || papel === 3) && (
            <Button as={Link} to="/RegistroUsuarios" variant="primary">
              Criar Usuário
            </Button>
          )}

          {(papel === 0 || papel === 2 || papel === 3) && (
            <Button as={Link} to="/RegistroClinica" variant="primary">
              Criar Clinica
            </Button>
          )}

          {(papel === 0 || papel === 1 || papel === 3)&& (
            <Button as={Link} to="/RegistroPaciente" variant="primary">
              Criar Paciente
            </Button>
          )}

        </div>

        <div style={{ width: "500px", maxWidth: "100%" }}>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={Img1}
                alt="Primeiro slide"
                style={{ height: "300px", objectFit: "cover" }}
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src={Img2}
                alt="Segundo slide"
                style={{ height: "300px", objectFit: "cover" }}
              />
            </Carousel.Item>
          </Carousel>
        </div>

      </div>
    </Layout >
  );
}
