import { useState } from 'react'
const Contador = () => {
    const [valor, setValor] = useState(0); // Criando um estado
    const diminuir = () => {
        setValor( valor - 1 );
    }
    const incrementar = () => {
        setValor( valor + 1 );
    }
    return (
        <div>
            <button onClick={diminuir}>-</button>
            <span>{valor}</span>
            <button onClick={incrementar}>+</button>
        </div>
    )
}
export default Contador