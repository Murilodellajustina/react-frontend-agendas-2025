import Perfil from "./Perfil"
import Saudacao from "./saudacao"
import Feed from "./feed"
import Contador from "./contador"
import NovoPost from "./NovoPost"
import FeedFiltravel from "./FeedFiltravel"
import BootstrapTest from "./BootstrapTest"
// src/App.jsx
const App = () => {
  return (
    <>
      <p>Olá, React!</p>
      <Perfil />
      <Saudacao nome = "Ester" />
      <Feed/>
      <Contador/>
      <NovoPost/>
      <FeedFiltravel/>
      <BootstrapTest/>
    </>
  )
}
export default App