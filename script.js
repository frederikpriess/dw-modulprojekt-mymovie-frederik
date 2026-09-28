import { fetchNowPlaying, fetchPopular, getImageUrl } from "./javascript/api/tmdb.js";
import { formatRating, formatRuntime } from "./javascript/utils/formatters.js";

const now_playing = await fetchNowPlaying()
const popular = await fetchPopular()

console.log(getImageUrl(now_playing[0].poster_path))
console.log(formatRating(now_playing[0].vote_average));
console.log(formatRuntime(107));
console.log(popular[0]);


