import { fetchNowPlaying, fetchPopular, fetchGenres } from "./javascript/api/tmdb.js";
import { NowShowingList } from "./javascript/components/NowShowingList.js";
import { PopularList } from "./javascript/components/PopularList.js";
import { Header } from "./javascript/components/Header.js";
import { SectionHeader } from "./javascript/components/SectionHeader.js";

const [nowPlaying, popular, genreMap] = await Promise.all([
    fetchNowPlaying(),
    fetchPopular(),
    fetchGenres(),
])

const root = document.getElementById("root")

root.append(
    new Header().render(),
    new SectionHeader("Now Showing").render(),
    new NowShowingList(nowPlaying).render(),
    new SectionHeader("Popular").render(),
    new PopularList(popular, genreMap).render()

)


