import { useHistory } from "react-router"
import useProtectPage from "../../hooks/useProtectPage"
import { goBack, goToLogout, goToPostDetails } from "../../routes/coordinator"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "../../parameters"
import { useParams } from "react-router-dom"


function PostDetails() {

    useProtectPage()

    const history = useHistory()
    const { id } = useParams()

    const [post, setPost] = useState({})

    useEffect( async () => {

        await getPost()
    })

    const getPost = async () => {

        try {

            const headers = { headers: { Authorization :localStorage.getItem("token") } }

            const response = await axios.get(`${baseUrl}/musics/${id}`, headers)

            setPost(response.data.post)
        }
        catch (error) {

            goToLogout(history)
        }
        
    }

    return (
        <div>
            <h1>PostDetails</h1>
            {post.author && (
                <div>
                    <hr/>
                    <h3>Autor: {post.author}</h3>
                    <h3>Título: {post.title}</h3>
                    <h3>Album: {post.album}</h3>
                    <h3>Postado em: {post.createdAt}</h3>
                    <h3>Generos: {post.genres.map(genre => <p>{genre}</p>)}</h3>
                    <h3>Postado por: {post.postedBy.nickname}</h3>
                    <h3>Data de lançamento: {post.releaseDate}</h3>
                    <audio controls src={post.file}/>
                </div>
                )}
            <button onClick={() => goBack(history)}>Voltar</button>
        </div>
    )
}

export default PostDetails
