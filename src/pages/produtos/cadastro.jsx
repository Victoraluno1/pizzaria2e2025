import { useState, useEffect } from "react";
import axios from "axios";

// Formulário simples em JavaScript usando apenas <div>, <input>, useState/useEffect e axios
const CadastroProduto = () => {
  const [form, setForm] = useState({
    nome: "",
    tipo: "",
    precoVenda: "",
    descricao: ""
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (form.precoVenda.includes(",")) {
      setForm((f) => ({ ...f, precoVenda: f.precoVenda.replace(",", ".") }));
    }
  }, [form.preco]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = async () => {
    setMsg("");
    const payload = {
      nome: form.nome,
      tipo: form.tipo,
      precoVenda: Number(form.precoVenda),
      descricao: form.descricao     
    };

    if (!payload.nome || !payload.descricao || !payload.tipo || !payload.precoVenda) {
      setMsg("Preencha todos os campos corretamente.");
      return;
    }

    setLoading(true);
    try {
      axios.post("http://172.19.0.49/pizzariateste/api/v1/produto", 
        payload,
        {
          mode: "no-cors",
          headers: {
            "Accept":"*",
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
      setMsg("Produto cadastrado com sucesso.");
      setForm({ nome: "", tipo: "", precoVenda: "", descricao: ""});
    } catch (err) {
      const texto = err?.response?.data?.message || err?.message || "Falha ao cadastrar.";
      setMsg(texto);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>Cadastro de Produto</div>

      {msg ? <div>{msg}</div> : null}

      <div>
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={onChange}
        />
      </div>

      <div>
        <input
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={onChange}
        />
      </div>

      <div>
        <input
          name="tipo"
          placeholder="Tipo (ex.: FISICO/SERVICO/DIGITAL)"
          value={form.tipo}
          onChange={onChange}
        />
      </div>

      <div>
        <input
          name="precoVenda"
          placeholder="Preço (ex.: 199.90)"
          value={form.precoVenda}
          onChange={onChange}
        />
      </div>

      <div>
        <input
          name="categoriaId"
          placeholder="Categoria ID (ex.: 12)"
          value={form.categoriaId}
          onChange={onChange}
        />
      </div>

      <div>
        <input
          type="button"
          value={loading ? "Enviando..." : "Cadastrar"}
          onClick={submit}
          disabled={loading}
        />
      </div>
    </div>
  );
}

export default CadastroProduto;