import { Form } from "@unform/web"
import styled from "styled-components"
import Background from "../../assets/background.jpg"
import colors from "../../styles/colors"
import fonts from "../../styles/fonts"


export const Forms = styled(Form)`
  display: flex;
  width: 70%;
  flex-direction: column;
  align-self: center;
  span {
    margin-top: 20px;
    font-size: 12px;
    color: ${colors.blue};
    ${fonts[400]};
  }
`

export const Posts = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
min-height: 74vh;
`

export const Post = styled.div`
  color: black;
  border: 2px solid black;
  border-radius: 30px;
  margin: 10px;
  padding: 70px 100px;
`
