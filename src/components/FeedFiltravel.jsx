// src/components/FeedFiltravel.jsx
import { useState } from "react";
const Filtro = ({ termoState, setTermoState }) => {
    return (
        <input
            placeholder="Filtrar por autor..."
            value={termoState}
            onChange={e => setTermoState(e.target.value)}
        />
    )
}
const Lista = ({ posts, termoState }) => {
    const filtro = posts.filter(post =>
        post.autor.toLowerCase().includes(termoState.toLowerCase())
    );
    return filtro.map(post => <div key={post.id}>{post.autor}: {post.texto}</div>);
}
const FeedFiltravel = () => {
    const [termoState, setTermoState] = useState("");
    const posts = [
        { id: 1, autor: "Ana", texto: "JSX ❤️" },
        { id: 2, autor: "Leo", texto: "Hooks são poderosos" },
    ];
    return (
        <>
            <Filtro termoState={termoState} setTermoState={setTermoState} />
            <Lista posts={posts} termoState={termoState} />
        </>
    )
}
export default FeedFiltravel