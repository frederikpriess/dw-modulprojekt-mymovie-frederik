import { fetchNowPlaying, fetchPopular, fetchGenres } from "./javascript/api/tmdb.js";
import { NowShowingList } from "./javascript/components/NowShowingList.js";
import { PopularList } from "./javascript/components/PopularList.js";

const [nowPlaying, popular, genreMap] = await Promise.all([
    fetchNowPlaying(),
    fetchPopular(),
    fetchGenres(),
])

const root = document.getElementById("root")

root.append(
    new NowShowingList(nowPlaying).render(),
    new PopularList(popular, genreMap).render()

)


