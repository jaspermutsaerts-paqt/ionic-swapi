import {ref, onMounted, watch} from "vue";
import axios from "axios";

export interface Person {
    name: string;
    films: string[]
}


export interface ResultSet {
    count: number;
    previous: string | null;
    next: string | null;
    results: Person[];
}

export function usePeople() {
    const API = 'https://swapi.dev/api'


    const getPeople = async(): Promise<ResultSet> => {
        const url = `${API}/people`
        const response = await axios.get<ResultSet>(url)
        return response.data as ResultSet
    }

    return {
        getPeople,
    }

}
