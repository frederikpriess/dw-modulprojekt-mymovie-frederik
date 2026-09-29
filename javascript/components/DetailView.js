import { getImageUrl } from "../api/tmdb.js";
import { formatRating, formatRuntime, getUsCertification } from "../utils/formatters.js";

export class DetailView {
    constructor(movie) {
        this.movie = movie
    }

    render() {
        const view = document.createElement("div")
        view.className = "detail"

        view.append(this.renderHero(), this.renderCard())
        return view
    }

    renderHero() {
        const hero = document.createElement("div")
        hero.className = "detail__hero"

        const backdrop = document.createElement("img")
        backdrop.className = "detail__backdrop"
        backdrop.src = getImageUrl(this.movie.backdrop_path, "w780")
        backdrop.alt = this.movie.title

        const back = document.createElement("a")
        back.className = "detail__back"
        back.href = "index.html"
        back.textContent = "←"
        back.setAttribute("aria-label", "Back to list")

        hero.append(backdrop, back)
        return hero
    }

    renderCard() {
        const card = document.createElement("section")
        card.className = "detail__card"

        const titleRow = document.createElement("div")
        titleRow.className = "detail__title-row"

        const title = document.createElement("h1")
        title.className = "detail__title"
        title.textContent = this.movie.title

        titleRow.append(title)

        const rating = document.createElement("span")
        rating.className = "detail__rating"
        rating.textContent = `★ ${formatRating(this.movie.vote_average)}`

        const genres = document.createElement("div")
        genres.className = "detail__genres"

        this.movie.genres.forEach((genre) => {
            const tag = document.createElement("span")
            tag.className = "tag"
            tag.textContent = genre.name

            genres.append(tag)
        });

        card.append(titleRow, rating, genres, this.renderFacts(), this.renderDescription())
        return card

    }

    renderFacts() {
        const facts = document.createElement("div")
        facts.className = "detail__facts"

        facts.append(
            this.renderFact(formatRuntime(this.movie.runtime), "Length"),
            this.renderFact(this.movie.original_language.toUpperCase(), "Language"),
            this.renderFact(getUsCertification(this.movie.release_dates.results) ?? "Not rated", "Rating")
        )

        return facts
    }

    renderFact(value, label) {
        const fact = document.createElement("div")
        fact.className = "detail__fact"

        const valueElement = document.createElement("span")
        valueElement.className = "detail__fact-value"
        valueElement.textContent = value

        const labelElement = document.createElement("span")
        labelElement.className = "detail__fact-label"
        labelElement.textContent = label

        fact.append(valueElement, labelElement)
        return fact
    }

    renderDescription() {
        const section = document.createElement("section")
        section.className = "detail__description-section"

        const heading = document.createElement("h2")
        heading.className = "detail__heading"
        heading.textContent = "Description"

        const description = document.createElement("p")
        description.className = "detail__description"
        description.textContent = this.movie.overview

        section.append(heading, description)
        return section
    }
}