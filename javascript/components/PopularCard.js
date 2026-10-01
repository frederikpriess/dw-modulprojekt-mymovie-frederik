import { getImageUrl } from "../api/tmdb.js";
import { formatRating } from "../utils/formatters.js";

export class PopularCard {
    constructor(movie, genreMap) {
        this.movie = movie
        this.genreMap = genreMap
    }

    render() {
        const link = document.createElement("a")
        link.className = "popular-card"
        link.href = `detail.html?id=${this.movie.id}`

        const poster = document.createElement("img")
        poster.className = "popilar-card__poster"
        poster.src = getImageUrl(this.movie.poster_path, "w185")
        poster.alt = this.movie.title
        poster.loading = "lazy"

        const info = document.createElement("div")
        info.className = "popular-card__info"

        const title = document.createElement("span")
        title.className = "popular-card__title"
        title.textContent = this.movie.title

        const rating = document.createElement("span")
        rating.className = "popular-card__rating"
        
        const star = document.createElement("span")
        star.className = "star"
        star.textContent = "★"

        rating.append(star, document.createTextNode(`${formatRating(this.movie.vote_average)}`))

        const tags = document.createElement("div")
        tags.className = "popular-card__tags"

        this.movie.genre_ids
            .slice(0, 3)
            .map((id) => this.genreMap[id])
            .filter(Boolean)
            .forEach((name) => {
                const tag = document.createElement("span")
                tag.className = "tag"
                tag.textContent = name
                tags.append(tag)
            });

        info.append(title, rating, tags)
        link.append(poster, info)
        return link
    }
}