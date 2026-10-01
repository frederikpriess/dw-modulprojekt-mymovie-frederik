import { fetchNowPlaying, fetchPopular, fetchGenres } from "./javascript/api/tmdb.js";
import { NowShowingList } from "./javascript/components/NowShowingList.js";
import { PopularList } from "./javascript/components/PopularList.js";
import { Header } from "./javascript/components/Header.js";
import { SectionHeader } from "./javascript/components/SectionHeader.js";
import { ThemeManager } from "./javascript/utils/ThemeManager.js";

const [nowPlaying, popular, genreMap] = await Promise.all([
    fetchNowPlaying(),
    fetchPopular(),
    fetchGenres(),
])

const theme = new ThemeManager
const root = document.getElementById("root")

const header = new Header(theme, () => theme.toggle())

root.append(
    header.render(),
    new SectionHeader("Now Showing").render(),
    new NowShowingList(nowPlaying).render(),
    new SectionHeader("Popular").render(),
    new PopularList(popular, genreMap).render()

)


