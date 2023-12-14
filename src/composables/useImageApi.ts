import { createApi } from 'unsplash-js'
import { Random } from 'unsplash-js/dist/methods/photos/types'
import { Person } from '@/types/Person'
import { Planet } from '@/types/Planet'

export function useImageApi() {
    const API_KEY = process.env.VUE_APP_UNSPLASH_API_KEY

    const TOPICS = {
        FILM: 'Bm0tkMoExAg',
        WALLPAPER: 'Bm0tkMoExAg',
        RENDERS_3D: 'CDwuwXJAbEw',
    }

    const COOLDOWN_MINUTES = 2

    const api = createApi({ accessKey: API_KEY })

    // TODO/clear: add cooldown in case we exceed rate limit
    let cooldown: Date | undefined

    const getImage = (keyword: string, topicIds: string[]) => {
        // TODO/clear: add caching to return the same image for the same keyword at least during session

        if (cooldown) {
            return Promise.reject('Cooling down until: ' + cooldown?.toISOString())
        }

        return api.photos
            .getRandom({
                query: keyword,
                orientation: 'squarish',
                topicIds,
            })
            .then((result) => {
                const { response } = result
                return (response as Random)?.urls.regular
            })
            .catch((reason) => {
                // Just assume rate limit was the problem
                cooldown = new Date(new Date().getTime() + COOLDOWN_MINUTES * 60_000)
                return Promise.reject('Cooling down until: ' + cooldown.toISOString())
            })
    }

    const getPersonImage = (person: Person) => {
        const keyword = 'Star+Wars person ' + person.name.replace(' ', '+')
        return getImage(keyword, [TOPICS.FILM])
    }

    const getPlanetImage = (planet: Planet) =>
        getImage('Star+Wars planet ' + planet.name, [TOPICS.RENDERS_3D, TOPICS.FILM])

    return {
        getPersonImage,
        getPlanetImage,
    }
}
