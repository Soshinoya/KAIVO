export const addToLS = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const removeFromLS = key => localStorage.removeItem(key)

export const getFromLS = key => JSON.parse(localStorage.getItem(key))

export const clearLS = () => localStorage.clear()