import React from 'react'

const Perfil = () => {
    const nome = "Murilo Della Justina";
    const imgUrl = "https://www.freeiconspng.com/uploads/profile-icon-9.png";
    const descricao = "Desenvolvedor e aluno. Aprendendo React.";
    return (
        <div>
            <h1>{nome}</h1>
            <img src={imgUrl} width={100} alt="Foto de perfil" />
            <p>{descricao}</p>
        </div>
    )
}

export default Perfil