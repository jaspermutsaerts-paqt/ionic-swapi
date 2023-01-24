import axios from "axios";
import {ResultSet} from "@/types/ResultSet";
import {Planet} from "@/types/Planet";


export function usePlanets() {
    const API = 'https://swapi.dev/api'


    const getPlanets = async (): Promise<ResultSet<Planet>> => {
        const url = `${API}/planets`
        const response = await axios.get<ResultSet<Planet>>(url)
        return response.data as ResultSet<Planet>
    }

    const getPlanet = async (url: string): Promise<Planet> => {
        const response = await axios.get<Planet>(url)
        return response.data as Planet
    }

    return {
        getPlanets,
        getPlanet,
    }

}
