import { useState } from "react"

function App(){

  const [nome, setNome] = useState('Ronaldo')

  const Formulario = ()=>{
    return (
      <div>
<input 
  className= "nome"
  onChange={(e)=>{setNome(e.target.value)}}
  type="text" />

    <button
    className="botao"
    onClick={()=>{alert(nome)}}
    >
      Clique Aqui
    </button>
      </div>
    )
  }

  return (
<div>
  <h3>Pizzaria 2E</h3>

 <Formulario /> 
 <Formulario />  
 <Formulario /> 
 <Formulario /> 
</div>
  )
}

export default App