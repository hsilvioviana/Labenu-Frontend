import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router"
import useProtectPage from "../../hooks/useProtectPage"
import { baseUrl } from "../../parameters"
import { goToHome } from "../../routes/coordinator"
import { Container, Body, Forms } from "./styled"
import Button  from "../../components/Button"
import Input from "../../components/Input"

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
        <Container>
            <Body>
                <h1>Criar Post</h1>
                <Forms>
                    <Input onChange={onChange} placeholder="Nome da Música" name="title" value={form.title}/>
                    <Input onChange={onChange} placeholder="Nome do Autor" name="author" value={form.author}/>
                    <Input onChange={onChange} placeholder="Data de Lançamento" name="releaseDate" value={form.releaseDate}/>
                    <Input onChange={onChange} placeholder="Link" name="file" value={form.file}/>
                    <Input onChange={onChange} placeholder='Gêneros, Separar com "/"' name="genres" value={form.genres}/>
                    <Input onChange={onChange} placeholder="Álbum" name="album" value={form.album}/>
                    <Button onClick={createPost}>Criar Post</Button>
                </Forms>
                <br/>
                <a href="/">Voltar</a>
            </Body>
        </Container>
    )
}

export default PostCreate