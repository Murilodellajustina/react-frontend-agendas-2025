import { Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
const BootstrapTest = () => {
  return (
    <div>
        <button className= "btn btn-primary"> Azul </button>
        <button className= "btn btn-warning"> Amarelo </button>
        <Button variant = "danger"> Vermelho</Button>
    </div>
  )
}

export default BootstrapTest