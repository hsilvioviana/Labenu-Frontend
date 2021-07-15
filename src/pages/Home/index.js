import { useHistory } from "react-router"
import useProtectPage from "../../hooks/useProtectPage"
import { goToLogout, goToPlaylists, goToPostCreate, goToPostDetails } from "../../routes/coordinator"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "../../parameters"
import { Container, Body, Post, Forms } from "./styled"
import Button  from "../../components/Button"


function Home() {

    useProtectPage()

    const history = useHistory()

    const [posts, setPosts] = useState([])

    useEffect( async () => {

        await getPosts()
    })

    const getPosts = async () => {

        try {

            const headers = { headers: { Authorization: localStorage.getItem("token") } }

            const response = await axios.get(`${baseUrl}/musics`, headers)

            setPosts(response.data.posts)
        }
        catch (error) {

            goToLogout(history)
        }
        
    }

    return (
        <Container>
            <Body>

                <h1>Home</h1>
                <Forms>
                    <Button onClick={() => goToLogout(history)}>Logout</Button>
                    <Button onClick={() => goToPostCreate(history)}>Criar Post</Button>
                    <Button onClick={() => goToPlaylists(history)}>Playlists</Button>
                </Forms>
                <br/>
                {posts && posts.map(post => {

                    return (
                    <Post>
                        <h1>{post.title}</h1>
                        <h3>Autor: {post.author}</h3>
                        <h3>Postado por: {post.postedBy.nickname}</h3>
                        <h3>Postado em: {post.createdAt}</h3>
                        <Button onClick={() => goToPostDetails(history, post.id)}>Detalhes</Button>
                    </Post>
                    )
                })}
            </Body>
        </Container>
    )
}

export default Home