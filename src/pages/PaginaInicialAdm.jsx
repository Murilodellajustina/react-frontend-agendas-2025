import Layout from "../components/Layout";
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from "react";
import { api } from "../Services/Api";
import Img1 from "../Imagens/IMG1.png";
import Img2 from "../Imagens/IMG2.png";

export default function PaginaInicialAdm() {
  const [nome, setNome] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const payload = JSON.parse(atob(token.split(".")[1]));
    const idUsuario = payload.id;

    api.get(`/usuarios/${idUsuario}`)
      .then(res => setNome(res.data.nome))
      .catch(err => console.error("Erro ao buscar usuario:", err));
  }, []);

  return (
    <Layout>
      <div className="d-flex justify-content-center p-4">
        <p  >Seja bem vindo {nome} </p></div>
      <div className="d-flex justify-content-end p-4">

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
    </Layout>
  );
}