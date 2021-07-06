import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router"
import useUnprotectPage from "../../hooks/useUnprotectPage"
import { baseUrl } from "../../parameters"
import { goToHome, goToLogin } from "../../routes/coordinator"

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
        <div>
            <h1>Signup</h1>
            <form>
                <input onChange={onChange} placeholder="Nome" name="name" value={form.name}/>
                <input onChange={onChange} placeholder="Apelido" name="nickname" value={form.nickname}/>
                <input onChange={onChange} placeholder="Email" name="email" value={form.email}/>
                <input onChange={onChange} placeholder="Senha" name="password" value={form.password} type="password"/>
                <button onClick={signup}>Entrar</button>
            </form>
            <button onClick={() => goToLogin(history)}>Login</button>
        </div>
    )
}

export default Signup
