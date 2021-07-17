import React, { useRef, useState, useCallback } from "react"
import { Container } from "./styles"
import InputMask from "react-input-mask"


const Input = ({ name, onChange, value, placeholder, type }) => {
  
  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false)
  const [isFielled, setIsFilled] = useState(false)

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, [])

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, [])

  return (
    <>
      <Container isFocused={isFocused} isFielled={isFielled}>

        <InputMask onChange={onChange} onFocus={handleInputFocus} onBlur={handleInputBlur} 
        ref={inputRef} name={name} value={value} type={type} placeholder={placeholder}/>   
      </Container>
    </>
  )
}

export default Input;
