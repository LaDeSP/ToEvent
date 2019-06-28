export const Save = (data) => {
    localStorage.setItem("state", JSON.stringify(data))
}

export const Load = (key) => {
    var value = localStorage.getItem(key)
    return JSON.parse(value)
}

export const LoadApplicationState = () => {
    var key = 'state'
    return Load(key)
}

export const RemoveApplicationState = () => {
    var key = 'state'
    localStorage.removeItem(key);
}