import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import useProtectPage from "../../hooks/useProtectPage"
import { baseUrl } from "../../parameters"
import { goToPlaylistDetails } from "../../routes/coordinator"
import { Forms, Collection, Collections } from "./styles"
import Button  from "../../components/Button"
import Input from "../../components/Input"

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

    const deletePlaylist = async (playlistId) => {

        try {

            if (window.confirm("Você tem certeza que quer apagar essa playlist?")) {

            const headers = { headers: { Authorization: localStorage.getItem("token") } }

            await axios.delete(`${baseUrl}/playlists/remove/${playlistId}`, headers)

            window.alert("Playlist deletada com sucesso")

            await getPlaylists()
            }
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <div>

            <h1>Criar Playlist</h1>

            <Forms>
                <Input onChange={onChange} placeholder="Nome" name="title" value={form.title}/>
                <Button onClick={createPlaylist}>Criar</Button>
            </Forms>

            <Collections>
                {playlists && playlists.map(playlist => {
                    return(
                        <Collection>
                        <h1>{playlist.title}</h1>
                        <Button onClick={() => goToPlaylistDetails(history, playlist.id)}>Detalhes</Button>
                        <Button onClick={() => deletePlaylist(playlist.id)}>Apagar</Button>
                        </Collection>
                    )
                })}
            </Collections>
        </div>
    )
}

export default Playlists
