import { fetchNowPlaying, fetchPopular, fetchGenres, searchMovies } from "./javascript/api/tmdb.js";
import { NowShowingList } from "./javascript/components/NowShowingList.js";
import { PopularList } from "./javascript/components/PopularList.js";
import { PopularCard } from "./javascript/components/PopularCard.js";
import { Header } from "./javascript/components/Header.js";
import { SectionHeader } from "./javascript/components/SectionHeader.js";
import { SearchBar } from "./javascript/components/searchBar.js";
import { ThemeManager } from "./javascript/utils/ThemeManager.js";
import { BottomNav } from "./javascript/components/BottomNav.js";

const [nowPlaying, popular, genreMap] = await Promise.all([
    fetchNowPlaying(),
    fetchPopular(),
    fetchGenres(),
])

const theme = new ThemeManager
const root = document.getElementById("root")

const header = new Header(theme)

const browseSections = document.createElement("div")
browseSections.append(
    new SectionHeader("Now Showing").render(),
    new NowShowingList(nowPlaying).render(),
    new SectionHeader("Popular").render(),
    new PopularList(popular, genreMap).render()
)

const searchResults = document.createElement("div")
searchResults.className = "popular-list"
searchResults.style.display = "none"

const searchBar = new SearchBar(async (query) => {
    if (!query) {
        browseSections.style.display = "block"
        searchResults.style.display = "none"
        return
    }

    const results = await searchMovies(query)
    results.sort((a, b) => b.popularity - a.popularity)

    searchResults.innerHTML = ""
    results.forEach((movie) => {
        searchResults.append(new PopularCard(movie, genreMap).render())
    })

    browseSections.style.display = "none"
    searchResults.style.display = "flex"
})

root.append(
    header.render(),
    searchBar.render(),
    browseSections,
    searchResults,
    new BottomNav().render()
)