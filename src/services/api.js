import axios from 'axios'
axios.defaults.baseURL = 'https://pixabay.com/api/'

const searchParams = new URLSearchParams({
    key: '41352870-ce801ab1c44b186ed563ae895',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
})

export async function getImages(query, page) {
    try {
        const url = `?${searchParams}&q=${encodeURIComponent(
            query
        )}&page=${page}`
        const response = await axios.get(url)

        return response
    } catch (error) {
        console.error('An error occurred while fetching images:', error)
        throw error
    }
}