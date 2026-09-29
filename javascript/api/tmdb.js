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
    
    return response.json()
}

export async function fetchNowPlaying() {
    const data = await fetchJson("/movie/now_playing")
    return data.results
}

const IMAGE_URL = "https://image.tmdb.org/t/p"

export function getImageUrl(path, size = "w500") {
    return `${IMAGE_URL}/${size}${path}`
}

export async function fetchPopular() {
    const data = await fetchJson("/movie/popular")
    return data.results
}

export async function fetchGenres() {
    const data = await fetchJson("/genre/movie/list")
    return Object.fromEntries (
        data.genres.map((genre) => [genre.id, genre.name])
    )
}

export async function fetchMovieDetails(id) {
    return fetchJson(`/movie/${id}?append_to_response=credits,videos,release_dates`)
}