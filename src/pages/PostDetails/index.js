import { useHistory } from "react-router"
import useProtectPage from "../../hooks/useProtectPage"
import { goBack } from "../../routes/coordinator"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "../../parameters"
import { useParams } from "react-router-dom"
import { Container, Body } from "./styled"


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

            goBack(history)
        }
        
    }

    return (
        <Container>
            <Body>

                <h1>{post.title}</h1>

                {post.author && (
                    <div>
                        <h3>Autor: {post.author}</h3>
                        <h3>Album: {post.album}</h3>        
                        <h3>Gêneros: {post.genres.join(" / ")}</h3>
                        <h3>Data de lançamento: {post.releaseDate}</h3>
                        <h3>Postado por: {post.postedBy.nickname}</h3>
                        <h3>Postado em: {post.createdAt}</h3>
                        <audio controls src={post.file}/>
                    </div>
                    )}

                <br/>
                <a href="/">Voltar</a>

            </Body>
        </Container>
    )
}

export default PostDetails
