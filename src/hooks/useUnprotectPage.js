import { useEffect } from "react"
import { useHistory } from "react-router"
import { goToHome } from "../routes/coordinator"


const useUnprotectPage = () => {

    const history = useHistory()

    useEffect(() => {

        const token = localStorage.getItem("token")

        if (token) {

            goToHome(history)
        }
    }, [history])
}

export default useUnprotectPage
