export const  login = (data) => {
    return {
        type: "login",
        payload: data
    }
}

export const  filter = (data) => {
    return {
        type: "filter",
        payload: data
    }
}

export const  onlyLiked = (data) => {
    return {
        type: "onlyLiked",
        payload: data
    }
}

export const  loaded = (data) => {
    return {
        type: "loaded",
        payload: data
    }
}

export const  select = (data) => {
    return {
        type: "select",
        payload: data
    }
}

export const  logout = () => {
    return {
        type: "logout"
    }
}