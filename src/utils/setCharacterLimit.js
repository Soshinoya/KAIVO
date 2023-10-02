export const setCharacterLimit = (str, limit) => {
    const arr = str?.split('')

    if (arr?.length > limit) {
        return [ ...arr?.splice(0, limit), '...' ].join('')
    } else {
        return str
    }
}