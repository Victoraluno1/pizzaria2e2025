import Produtos from "./pages/produtos"
import CadastroProduto from "./pages/produtos/cadastro"

const App = () => {

  return (
    <div>
      <h1>Projeto Pizzaria</h1>

      <CadastroProduto />

      <Produtos />
      
      
    </div>
  )
}

export default App