export const HTMLToText = html => {
    const serializer = new XMLSerializer()
    return serializer.serializeToString(html)
}

export const textToHTML = text => {
    const parser = new DOMParser()
    return parser.parseFromString(text, 'text/html')
}