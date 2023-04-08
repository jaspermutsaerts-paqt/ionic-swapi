import axios from 'axios'
import { ResultSet } from '@/types/ResultSet'
import { Person } from '@/types/Person'
import { Planet } from '@/types/Planet'
import { Page } from '@/types/Page'

export function useSwapi() {
    const API = 'https://swapi.dev/api'

    const getPeople = async (url: string | null = null): Promise<ResultSet<Person>> => {
        url ??= `${API}/people`
        const response = await axios.get<ResultSet<Person>>(url)
        return response.data as ResultSet<Person>
    }

    const getPerson = async (url: string): Promise<Person> => {
        const response = await axios.get<Person>(url)
        return response.data as Person
    }

    const findPerson = async (name: string): Promise<null | Person> => {
        const url = `${API}/people/?search=${name}`
        const response = await axios.get<ResultSet<Person>>(url)
        const result = response.data as ResultSet<Person>

        if (result.count === 1) {
            return result.results[0]
        }

        if (result.count > 1) {
            return Promise.reject(`Too many results for ${name}`)
        }

        return Promise.reject(`No results for ${name}`)
    }

    const getPeoplePage = async (url: string | null = null): Promise<Page<Person>> => {
        const start = await getPeople(url)
        return getPageOfSize(start, 25)
    }

    const getPlanets = async (url: string | null = null): Promise<ResultSet<Planet>> => {
        url ??= `${API}/planets`
        const response = await axios.get<ResultSet<Planet>>(url)
        return response.data as ResultSet<Planet>
    }

    const getPlanet = async (url: string): Promise<Planet> => {
        const response = await axios.get<Planet>(url)
        return response.data as Planet
    }

    const getPlanetsPage = async (url: string | null = null): Promise<Page<Planet>> => {
        const start = await getPlanets(url)
        return getPageOfSize(start, 25)
    }

    const getPageOfSize = async <Type>(
        current: ResultSet<Type>,
        size: number,
        items: Type[] = []
    ): Promise<Page<Type>> => {
        items = items.concat(current.results)

        if (!current.next || items.length >= size) {
            return { items, next: current.next } as Page<Type>
        }

        return axios.get<Type>(current.next).then((result) => {
            const next = result.data as ResultSet<Type>
            return getPageOfSize(next, size, items)
        })
    }

    return {
        getPeoplePage,
        getPlanetsPage,
        getPerson,
        findPerson,
        getPlanet,
    }
}
