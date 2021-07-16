import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import useProtectPage from "../../hooks/useProtectPage"
import { baseUrl } from "../../parameters"
import { goToPlaylists, goToPostDetails } from "../../routes/coordinator"


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
            <button onClick={() => goToPlaylists(history)}>Voltar</button>
            <h1>{title}</h1>
            { musics && musics.map(music => {
                return (
                    <div>
                        <h3>{music.author} / {music.title}</h3>
                        <button onClick={() => goToPostDetails(history, music.id)}>Detalhes</button>
                        <button onClick={() => removeMusic(music.id)}>Remover</button>
                    </div>
                )
            }) }
        </div>
    )
}

export default PlaylistDetails