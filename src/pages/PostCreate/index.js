import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router"
import useProtectPage from "../../hooks/useProtectPage"
import { baseUrl } from "../../parameters"
import { goBack, goToHome } from "../../routes/coordinator"

function PostCreate() {

    useProtectPage()

    const history = useHistory()

    const postForm = { title: "", author: "", releaseDate: "", file: "", genres: "", album: ""}

    const [form, setForm] = useState(postForm)

    const onChange = (event) => {

        const {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const createPost = async (event) => {

        event.preventDefault()

        try {

            let body

            if (form.genres.includes("/")) { body = {...form, genres: form.genres.split("/")} }
            else { body = {...form, genres: [form.genres] } }

            const headers = { headers: { Authorization: localStorage.getItem("token") } }

            await axios.post(`${baseUrl}/musics/post`, body, headers)

            goToHome(history)
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <div>
            <h1>PostCreate</h1>
            <form>
                <input onChange={onChange} placeholder="Nome da Música" name="title" value={form.title}/>
                <input onChange={onChange} placeholder="Nome do Autor" name="author" value={form.author}/>
                <input onChange={onChange} placeholder="Data de Lançamento" name="releaseDate" value={form.releaseDate}/>
                <input onChange={onChange} placeholder="Link" name="file" value={form.file}/>
                <input onChange={onChange} placeholder='Gêneros, Separar com "/"' name="genres" value={form.genres}/>
                <input onChange={onChange} placeholder="Álbum" name="album" value={form.album}/>
                <button onClick={createPost}>Criar Post</button>
            </form>
            <button onClick={() => goBack(history)}>Voltar</button>
        </div>
    )
}

export default PostCreate