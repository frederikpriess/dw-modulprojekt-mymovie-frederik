import { getImageUrl } from "../api/tmdb.js";
import { formatRating, formatReleaseDate } from "../utils/formatters.js";

export class NowShowingCard {
    constructor(movie) {
        this.movie = movie
    }

    render() {
        const link = document.createElement("a")
        link.className = "now-card"
        link.href = `detail.html?id=${this.movie.id}`

        const poster = document.createElement("img")
        poster.className = "now-card__poster"
        poster.src = getImageUrl(this.movie.poster_path, "w342")
        poster.alt = this.movie.title
        poster.loading = "lazy"

        const title = document.createElement("span")
        title.className = "now-card__title"
        title.textContent = this.movie.title

        const rating = document.createElement("span")
        rating.className = "now-card__rating"

        const releaseDate = document.createElement("span")
        releaseDate.className = "now-card__date"
        releaseDate.textContent = formatReleaseDate(this.movie.release_date)

        const star = document.createElement("span")
        star.className = "star"
        star.textContent = "★ "

        rating.append(star, document.createTextNode(`${formatRating(this.movie.vote_average)}`))

        link.append(poster, title, rating, releaseDate)
        return link
    }
}