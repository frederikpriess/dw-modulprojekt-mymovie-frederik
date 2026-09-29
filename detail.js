import { getQueryParam } from "./javascript/utils/params.js";
import { fetchMovieDetails } from "./javascript/api/tmdb.js";
import { DetailView } from "./javascript/components/DetailView.js";

const id = getQueryParam("id")
const movie = await fetchMovieDetails(id)

const root = document.getElementById("root")
root.append(new DetailView(movie).render())