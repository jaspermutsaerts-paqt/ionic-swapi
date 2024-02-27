import { createApi } from 'unsplash-js'
import { Random } from 'unsplash-js/dist/methods/photos/types'
import { Person } from '@/types/Person'
import { Planet } from '@/types/Planet'

export function useImageApi() {
    const ACCESS_KEY = process.env.VUE_APP_UNSPLASH_ACCESS_KEY

    const TOPICS = {
        FILM: 'Bm0tkMoExAg',
        WALLPAPER: 'Bm0tkMoExAg',
        RENDERS_3D: 'CDwuwXJAbEw',
    }

    const COOLDOWN_MINUTES = 2

    const api = createApi({ accessKey: ACCESS_KEY })

    let cooldown: Date | undefined

    const getImage = (keyword: string, topicIds: string[]) => {
        if (cooldown) {
            const reason = 'Cooling down until: ' + cooldown?.toISOString()
            console.warn(reason)
            return Promise.reject(reason)
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
                console.log('Failed to get image', reason)
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
