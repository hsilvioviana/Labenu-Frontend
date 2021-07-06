import { useHistory } from "react-router"
import useProtectPage from "../../hooks/useProtectPage"
import { goToLogout, goToPostCreate, goToPostDetails } from "../../routes/coordinator"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "../../parameters"


function Home() {

    useProtectPage()

    const history = useHistory()

    const [posts, setPosts] = useState([])

    useEffect( async () => {

        await getPosts()
    })

    const getPosts = async () => {

        try {

            const headers = { headers: { Authorization :localStorage.getItem("token") } }

            const response = await axios.get(`${baseUrl}/musics`, headers)

            setPosts(response.data.posts)
        }
        catch (error) {

            goToLogout(history)
        }
        
    }

    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => goToLogout(history)}>Logout</button>
            <button onClick={() => goToPostCreate(history)}>Criar Post</button>
            {posts && posts.map(post => {

                return (
                <div>
                    <hr/>
                    <h3>Autor: {post.author}</h3>
                    <h3>Título: {post.title}</h3>
                    <h3>Postado em: {post.createdAt}</h3>
                    <h3>Generos: {post.genres.map(genre => <p>{genre}</p>)}</h3>
                    <h3>Postado por: {post.postedBy.nickname}</h3>
                    <button onClick={() => goToPostDetails(history, post.id)}>Detalhes</button>
                </div>
                )
            })}
        </div>
    )
}

export default Home