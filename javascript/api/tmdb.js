import { TMDB_TOKEN } from "../config.js";

const BASE_URL =  "https://api.themoviedb.org/3"

async function fetchJson(path) {
    const response = await fetch(`${BASE_URL}${path}`, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${TMDB_TOKEN}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Request failed (status ${response.status}): ${path}`);
    }
    
    return response.Json()
}

export async function fetchNowPlaying() {
    const data = await fetchJson("/movie/now_playing")
    return data.results
}