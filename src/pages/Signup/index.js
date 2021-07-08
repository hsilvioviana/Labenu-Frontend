import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router"
import useUnprotectPage from "../../hooks/useUnprotectPage"
import { baseUrl } from "../../parameters"
import { goToHome } from "../../routes/coordinator"
import { Container, Body, Forms } from "./styled"
import Button  from "../../components/Button"
import Input from "../../components/Input"

function Signup() {

    useUnprotectPage()

    const history = useHistory()

    const signupForm = { name: "", nickname: "", email: "", password: "" }

    const [form, setForm] = useState(signupForm)

    const onChange = (event) => {

        const {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const signup = async (event) => {

        event.preventDefault()

        try {

            const response = await axios.post(`${baseUrl}/users/signup`, form)
            window.localStorage.setItem("token", response.data.token)
            goToHome(history)
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <Container>
            <Body>

                <h1>Cadastro</h1>

                <Forms>
                    <Input onChange={onChange} placeholder="Nome" name="name" value={form.name}/>
                    <Input onChange={onChange} placeholder="Apelido" name="nickname" value={form.nickname}/>
                    <Input onChange={onChange} placeholder="Email" name="email" value={form.email}/>
                    <Input onChange={onChange} placeholder="Senha" name="password" value={form.password} type="password"/>
                    <Button onClick={signup}>Entrar</Button>
                </Forms>

                <br/>
                <p>Já possui uma conta? <strong><a href="/login">Login</a></strong></p>
            </Body>
        </Container>
    )
}

export default Signup
