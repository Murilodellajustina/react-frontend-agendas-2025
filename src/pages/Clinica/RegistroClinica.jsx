import { useState, useEffect } from "react";
import { api } from "../../Services/Api";
import Layout from "../../components/Layout";

export default function CriarUsuario() {
    const [nome, setNome] = useState("");
    const [cep, setCEP] = useState("");
    const [endereco, setEndereco] = useState("");
    const [telefone, setTelefone] = useState("");
    const [msg, setMsg] = useState("");

    const [user, setUser] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        api.get("/usuarios/me", { signal: controller.signal })
            .then(res => {
                setUser(res.data);

                if (![0, 2].includes(res.data.papel)) {
                    alert("Acesso negado!");
                    window.location.href = "/PaginaInicialAdm";
                }
            })
            .catch(err => {
                if (err.name === "CanceledError") return;
                console.error("Usuário não autenticado:", err);
                window.location.href = "/PaginaInicialAdm";
            });

        return () => controller.abort();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!nome || !cep || !endereco || !telefone) {
            setMsg("Preencha todos os campos!");
            return;
        }

        try {
            await api.post("/clinica", {
                nome,
                cep,
                endereco,
                telefone
            });

            setMsg("Clinica criado com sucesso!");
            setNome("");
            setCEP("");
            setEndereco("");
            setTelefone("");

            setTimeout(() => {
                window.location.href = "/ListarClinicas";
            }, 1500);

        } catch (error) {
            console.error(error);
            setMsg("Erro ao criar clinica.");
        }
    }

    return (
        <Layout>
            <div className="container mt-5">
                <h2 className="mb-4 text-primary">Cadastrar Nova Clinica</h2>

                {msg && <div className="alert alert-info">{msg}</div>}

                <form className="card p-4 shadow" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">CEP</label>
                        <input
                            type="CEP"
                            className="form-control"
                            value={cep}
                            onChange={(e) => setCEP(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Endereco</label>
                        <input
                            type="endereco"
                            className="form-control"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Telefone</label>
                        <input
                            type="telefone"
                            className="form-control"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                    </div>

                    <button className="btn btn-primary w-100" type="submit">
                        Cadastrar Clinica
                    </button>
                </form>
            </div>
        </Layout>
    );
}
