import { fetchNowPlaying, fetchPopular, fetchGenres } from "./javascript/api/tmdb.js";
import { NowShowingList } from "./javascript/components/NowShowingList.js";
import { PopularList } from "./javascript/components/PopularList.js";
import { Header } from "./javascript/components/Header.js";
import { SectionHeader } from "./javascript/components/SectionHeader.js";
import { ThemeManager } from "./javascript/utils/ThemeManager.js";
import { BottomNav } from "./javascript/components/BottomNav.js";
import { searchMovies } from "./javascript/api/tmdb.js";
import { debounce } from "./javascript/utils/debounce.js";

const testSearch = debounce((query) => {
    searchMovies(query).then((results) => console.log(results))
}, 300)

testSearch("spiderman")

const [nowPlaying, popular, genreMap] = await Promise.all([
    fetchNowPlaying(),
    fetchPopular(),
    fetchGenres(),
])

const theme = new ThemeManager
const root = document.getElementById("root")

const header = new Header(theme)

root.append(
    header.render(),
    new SectionHeader("Now Showing").render(),
    new NowShowingList(nowPlaying).render(),
    new SectionHeader("Popular").render(),
    new PopularList(popular, genreMap).render(),
    new BottomNav().render()
)


