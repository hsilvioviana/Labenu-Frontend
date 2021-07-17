import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import useProtectPage from "../../hooks/useProtectPage"
import { baseUrl } from "../../parameters"
import { goToPostDetails } from "../../routes/coordinator"
import { Post, Posts } from "./styles"
import Button  from "../../components/Button"


function PlaylistDetails() {

    useProtectPage()

    const history = useHistory()

    const { id } = useParams()

    const [ musics, setMusics ] = useState([])
    const [ title, setTitle ] = useState("")

    useEffect( async () => {

        await getMusics()
    }, [])

    const getMusics = async () => {

        try {

            const headers = { headers: { Authorization: localStorage.getItem("token") } }

            const response = await axios.get(`${baseUrl}/playlists/${id}`, headers)
    
            setTitle(response.data.title)
            setMusics(response.data.musics)
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    const removeMusic = async (musicId) => {

        try {

            const body = { musicId, playlistId: id }

            const headers = { headers: { Authorization: localStorage.getItem("token") } }

            await axios.post(`${baseUrl}/playlists/remove`, body, headers)
    
            await getMusics()
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <div>

            <h1>{title}</h1>

                <Posts>
                    {musics && musics.map(music => {

                        return (
                        <Post>
                            <h1>{music.title}</h1>
                            <h3>Autor: {music.author}</h3>
                            <h3>Postado em: {music.createdAt}</h3>
                            <Button onClick={() => goToPostDetails(history, music.id)}>Detalhes</Button>
                            <Button onClick={() => removeMusic(music.id)}>Remover</Button>
                        </Post>
                        )
                    })}
                </Posts>
        </div>
    )
}

export default PlaylistDetails