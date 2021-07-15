import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import useProtectPage from "../../hooks/useProtectPage"
import { baseUrl } from "../../parameters"
import { goToHome, goToPlaylistDetails } from "../../routes/coordinator"

function Playlists() {

    useProtectPage()

    const history = useHistory()

    const createPlaylistForm = { title: "" }

    const [form, setForm] = useState(createPlaylistForm)
    const [playlists, setPlaylists] = useState([])

    useEffect( async () => {

        await getPlaylists()
    }, [])

    const onChange = (event) => {

        const {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const getPlaylists = async () => {

        const headers = { headers: { Authorization: localStorage.getItem("token") } }

        const response = await axios.get(`${baseUrl}/playlists`, headers)

        setPlaylists(response.data.playlists)
    }

    const createPlaylist = async (event) => {

        event.preventDefault()

        try {

            const headers = { headers: { Authorization: localStorage.getItem("token") } }

            await axios.post(`${baseUrl}/playlists/create`, form, headers)

            window.alert("Playlist criada com Sucesso")

            setForm(createPlaylistForm)

            await getPlaylists()
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <div>
            <button onClick={() => goToHome(history)}>Voltar</button>
            <forms>
                <input onChange={onChange} Placeholder="Nome" name="title" value={form.title}/>
                <button onClick={createPlaylist}>Criar</button>
            </forms>
            {playlists && playlists.map(playlist => {
                return(
                    <div>
                    <h1>{playlist.title}</h1>
                    <button onClick={() => goToPlaylistDetails(history, playlist.id)}>Detalhes</button>
                    <button onClick={() => goToPlaylistDetails(history, playlist.id)}>Apagar</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Playlists
