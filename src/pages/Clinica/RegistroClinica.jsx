import { useState, useEffect } from "react";
import { api } from "../../Services/Api";
import Layout from "../../components/Layout";

function formatCEP(valor) {
    let v = valor.replace(/\D/g, "");
    if (v.length > 8) v = v.slice(0, 8);
    if (v.length > 5) {
        v = v.replace(/(\d{5})(\d{1,3})/, "$1-$2");
    }
    return v;
}

function formatTelefone(valor) {
    let v = valor.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);

    if (v.length <= 10) {
        v = v.replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, (_, ddd, p1, p2) => {
            let out = "";
            if (ddd) out += `(${ddd}`;
            if (ddd && ddd.length === 2) out += ") ";
            if (p1) out += p1;
            if (p2) out += "-" + p2;
            return out;
        });
    } else {
        v = v.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, (_, ddd, p1, p2) => {
            let out = "";
            if (ddd) out += `(${ddd}`;
            if (ddd && ddd.length === 2) out += ") ";
            if (p1) out += p1;
            if (p2) out += "-" + p2;
            return out;
        });
    }

    return v;
}

export default function CriarClinica() {
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
                const usuario = res.data;
                setUser(usuario);

                if (![0, 2, 3].includes(usuario.papel)) {
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

        const cepSemMascara = cep.replace(/\D/g, "");
        const telSemMascara = telefone.replace(/\D/g, "");

        try {
            await api.post("/clinica", {
                nome,
                cep: cepSemMascara,
                endereco,
                telefone: telSemMascara,
                ativo: true
            });

            setMsg("Clinica criado com sucesso!");
            setNome("");
            setCEP("");
            setEndereco("");
            setTelefone("");

 

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
                            type="text"
                            className="form-control"
                            value={cep}
                            onChange={(e) => setCEP(formatCEP(e.target.value))}
                            placeholder="00000-000"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Endereco</label>
                        <input
                            type="text"
                            className="form-control"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Telefone</label>
                        <input
                            type="text"
                            className="form-control"
                            value={telefone}
                            onChange={(e) => setTelefone(formatTelefone(e.target.value))}
                            placeholder="(00) 00000-0000"
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
