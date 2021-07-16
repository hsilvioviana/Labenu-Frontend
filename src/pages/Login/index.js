import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router"
import useUnprotectPage from "../../hooks/useUnprotectPage"
import { baseUrl } from "../../parameters"
import { goToHome, goToSignup } from "../../routes/coordinator"
import { Container, Body, Forms } from "./styled"
import Button  from "../../components/Button"
import Input from "../../components/Input"

function Login() {

    useUnprotectPage()

    const history = useHistory()

    const loginForm = { login: "", password: "" }

    const [form, setForm] = useState(loginForm)

    const onChange = (event) => {

        const {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const login = async (event) => {

        event.preventDefault()

        try {

            const response = await axios.post(`${baseUrl}/users/login`, form)
            window.localStorage.setItem("token", response.data.token)
            goToHome(history)
        }
        catch (error) {

            setForm({ ...loginForm, login: form.login })
            window.alert(error.response.data.error)
        }
    }

    return (
        <Container>
            <Body>

                <h1>Login</h1>
                
                <Forms>
                    <Input onChange={onChange} placeholder="Login" name="login" value={form.login}/>
                    <Input onChange={onChange} placeholder="Senha" name="password" value={form.password} type="password"/>
                    <Button onClick={login}>Entrar</Button>
                </Forms>

                <br/>
                <p>Não possui uma conta? <strong onClick={() => goToSignup(history)}>Cadastre-se</strong></p>
            </Body>
        </Container>
    )
}

export default Login