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
    const [playlists, setPlaylists] = useState([])
    const [selectedPlaylist, setSelectedPlaylist] = useState(0)

    useEffect( async () => {

        await getPost()
        await getPlaylists()
    }, [])

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

    const getPlaylists = async () => {

        const headers = { headers: { Authorization: localStorage.getItem("token") } }

        const response = await axios.get(`${baseUrl}/playlists`, headers)

        setPlaylists(response.data.playlists)
    }

    const selectPlaylist = (event) => {

        setSelectedPlaylist(event.target.selectedIndex)
    }

    const addMusic = async (event) => {

        event.preventDefault()

        const playlistId = playlists[selectedPlaylist].id
        const playlistTitle = playlists[selectedPlaylist].title

        try {

            const body = { musicId: id, playlistId }

            const headers = { headers: { Authorization: localStorage.getItem("token") } }

            await axios.post(`${baseUrl}/playlists/add`, body, headers)
    
            window.alert(`Música adicionada na playlist "${playlistTitle}"`)
        }
        catch (error) {

            window.alert(error.response.data.error)
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

                {playlists.length > 0 && (
                <form>

                    <select onChange={selectPlaylist}>
                        {playlists.map(playlist => {
                            return <option value={playlist.id}>{playlist.title}</option>
                        })}
                    </select>

                    <button onClick={addMusic}>Adicionar na Playlist</button>

                </form>)}
                <a href="/">Voltar</a>

            </Body>
        </Container>
    )
}

export default PostDetails
