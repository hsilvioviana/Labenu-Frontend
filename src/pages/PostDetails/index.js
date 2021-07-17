import { useHistory } from "react-router"
import useProtectPage from "../../hooks/useProtectPage"
import { goBack, goToHome } from "../../routes/coordinator"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "../../parameters"
import { useParams } from "react-router-dom"
import { Container, Body, Coordinator, Select } from "./styles"
import Button  from "../../components/Button"
import jwt_decode from "jwt-decode"
import { Forms } from "../Signup/styles"


function PostDetails() {

    useProtectPage()

    const history = useHistory()
    const { id } = useParams()

    const [post, setPost] = useState({})
    const [showDeleteButton, setShowDeleteButton] = useState(false)
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

            const userRole = jwt_decode(localStorage.getItem("token")).role
            const userId = jwt_decode(localStorage.getItem("token")).id

            setShowDeleteButton(userRole === "ADMIN" || response.data.post.postedBy.id === userId)
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

    const deletePost = async () => {

        try {

            if (window.confirm("Você tem certeza que quer apagar esse post?")) {

                const headers = { headers: { Authorization: localStorage.getItem("token") } }

                await axios.delete(`${baseUrl}/musics/remove/${id}`, headers)
        
                window.alert(`Post apagado com sucesso`)
                
                goToHome(history)
            }
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

                <Forms>
                {playlists.length > 0 && (
                <Select>

                    <select onChange={selectPlaylist}>
                        {playlists.map(playlist => {
                            return <option value={playlist.id}>{playlist.title}</option>
                        })}
                    </select>

                    <Button onClick={addMusic}>Adicionar na Playlist</Button>

                </Select>)}
                { showDeleteButton && <Button onClick={deletePost}>Deletar Post</Button>}
                </Forms>
                <br/>
                <Coordinator onClick={() => goBack(history)}>Voltar</Coordinator>
            </Body>
        </Container>
    )
}

export default PostDetails
