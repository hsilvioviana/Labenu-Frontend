import useProtectPage from "../../hooks/useProtectPage"


function Home() {

    useProtectPage()

    return (
        <div>Home</div>
    )
}

export default Home