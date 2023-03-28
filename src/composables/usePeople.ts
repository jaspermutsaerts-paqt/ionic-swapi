import axios from "axios";
import {ResultSet} from "@/types/ResultSet";
import {Person} from "@/types/Person";


export function usePeople() {
    const API = 'https://swapi.dev/api'

    const getPeople = async (): Promise<ResultSet<Person>> => {
        const url = `${API}/people`
        const response = await axios.get<ResultSet<Person>>(url)
        return response.data as ResultSet<Person>
    }

    const getPerson = async (url: string): Promise<Person> => {
        const response = await axios.get<Person>(url)
        console.log(response.data)
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

    return {
        getPeople,
        getPerson,
        findPerson,
    }

}
