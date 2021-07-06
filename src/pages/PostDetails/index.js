import { useParams } from "react-router-dom"
import useProtectPage from "../../hooks/useProtectPage"


function PostDetails() {

    useProtectPage()

    const { id } = useParams()

    return (
        <div>PostDetails<p>{id}</p></div>
    )
}

export default PostDetails