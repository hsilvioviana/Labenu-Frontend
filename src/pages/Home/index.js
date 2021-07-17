import { useHistory } from "react-router"
import useProtectPage from "../../hooks/useProtectPage"
import { goToLogout, goToPlaylists, goToPostCreate, goToPostDetails } from "../../routes/coordinator"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "../../parameters"
import { Post, Posts, Forms } from "./styles"
import Button  from "../../components/Button"
import Input from "../../components/Input"


function Home() {

    useProtectPage()

    const history = useHistory()

    const filterForm = { album: "", artist: "", genre: "" }

    const [posts, setPosts] = useState([])

    const [form, setForm] = useState(filterForm)

    useEffect( async () => {

        await getPosts()
    }, [])

    const onChange = (event) => {

        const {name, value} = event.target
        setForm({...form, [name]: value})
    }

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

    const filter = () => {
        
        let postsFiltrados = []

        postsFiltrados = posts.filter(post => {

            if (post.author.toLowerCase().includes(form.artist.toLowerCase())) {

                return true
            }

            return false
        })

        postsFiltrados = postsFiltrados.filter(post => {

            if (post.album.toLowerCase().includes(form.album.toLowerCase())) {

                return true
            }

            return false
        })

        postsFiltrados = postsFiltrados.filter(post => {

            for (let genre of post.genres) {

                if (genre.toLowerCase().includes(form.genre.toLowerCase())) {

                    return true
                }
            }   

            return false
        })
        
        return postsFiltrados
    }


    const postsFiltrados = filter(posts)

    return (
            <div>

                <h1>Filtrar por:</h1>

                <Forms>
                    <Input onChange={onChange} placeholder="Álbum" name="album" value={form.album}/>
                    <Input onChange={onChange} placeholder="Artista" name="artist" value={form.artist}/>
                    <Input onChange={onChange} placeholder="Gênero" name="genre" value={form.genre}/>
                </Forms>
                <br/>

                <Posts>
                {postsFiltrados.length > 0 && postsFiltrados.map(post => {

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
                </Posts>
            </div>
    )
}

export default Home