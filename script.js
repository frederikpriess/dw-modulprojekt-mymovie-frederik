import { fetchNowPlaying } from "./javascript/api/tmdb.js";
import { NowShowingList } from "./javascript/components/NowShowingList.js";

const nowPlaying = await fetchNowPlaying()
const root = document.getElementById("root")

root.append(new NowShowingList(nowPlaying).render())


