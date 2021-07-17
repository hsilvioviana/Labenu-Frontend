import { useHistory } from "react-router"
import { HeaderBox, Logo, NavButtons } from "./styles"


export default function Header(props) {
    
    const history = useHistory()

    return (
        <HeaderBox>
            <Logo>
                <img src="https://icon-library.com/images/android-music-icon/android-music-icon-2.jpg" alt="logo"/><h1>Labe Cloud</h1>
            </Logo>
            <NavButtons>
                {props.b1 && <button onClick={() => props.b1.function(history)}>{props.b1.name}</button>}
                {props.b2 && <button onClick={() => props.b2.function(history)}>{props.b2.name}</button>}
                {props.b3 && <button onClick={() => props.b3.function(history)}>{props.b3.name}</button>}
            </NavButtons>
        </HeaderBox>
    )
}
