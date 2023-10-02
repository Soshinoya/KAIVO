export const sortPosts = (posts, sortBy) => {
    const sortedData = [...posts]
    switch (sortBy) {
        case 'trending':
            // Код, сортирующий посты по лайкам
            sortedData.sort((a, b) => b?.likes?.length - a?.likes?.length)
            break;
        case 'latest':
            // Код, сортирующий посты по дате, по убыванию (новые посты в начале)
            sortedData.sort((a, b) => b?.date?.value - a?.date?.value)
            break;

        default:
            break;
    }
    return sortedData
}