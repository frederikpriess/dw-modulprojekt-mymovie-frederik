import { getQueryParam } from "./javascript/utils/params.js";
import { fetchMovieDetails } from "./javascript/api/tmdb.js";
import { DetailView } from "./javascript/components/DetailView.js";
import { Header } from "./javascript/components/Header.js";
import { ThemeManager } from "./javascript/utils/ThemeManager.js";


const id = getQueryParam("id")
const movie = await fetchMovieDetails(id)
const theme = new ThemeManager()

const root = document.getElementById("root")
const header = new Header(theme, () => theme.toggle())

root.append(header.render(), new DetailView(movie).render())