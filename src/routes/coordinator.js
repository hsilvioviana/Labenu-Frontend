export const goToLogin = (history) => {

    history.push("/login")
}

export const goToSignup = (history) => {

    history.push("/signup")
}

export const goToHome = (history) => {

    history.push("/")
}

export const goToPostCreate = (history) => {

    history.push("/post/create")
}

export const goToPostDetails = (history, id) => {

    history.push(`/post/${id}`)
}
