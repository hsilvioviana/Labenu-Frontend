import useProtectPage from "../../hooks/useProtectPage"


function PostCreate() {

    useProtectPage()

    return (
        <div>PostCreate</div>
    )
}

export default PostCreate