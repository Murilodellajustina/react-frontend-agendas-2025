import Perfil from "./Perfil"
import Saudacao from "./saudacao"
import Feed from "./feed"
import Contador from "./contador"

// src/App.jsx
const App = () => {
  return (
    <>
      <p>Olá, React!</p>
      <Perfil />
      <Saudacao nome = "Ester" />
      <Feed/>
      <Contador/>
    </>
  )
}
export default App