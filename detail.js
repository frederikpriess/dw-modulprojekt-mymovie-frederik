import { getQueryParam } from "./javascript/utils/params.js";
import { fetchMovieDetails } from "./javascript/api/tmdb.js";
import { DetailView } from "./javascript/components/DetailView.js";
import { ThemeManager } from "./javascript/utils/ThemeManager.js";
import { BottomNav } from "./javascript/components/BottomNav.js";

const id = getQueryParam("id")
const movie = await fetchMovieDetails(id)
const theme = new ThemeManager()

const root = document.getElementById("root")

root.append( 
    new DetailView(movie, theme).render(), 
    new BottomNav().render
)