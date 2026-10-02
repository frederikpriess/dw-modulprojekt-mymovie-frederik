import { getImageUrl } from "../api/tmdb.js";
import { formatRating, formatRuntime, getUsCertification, findTrailer } from "../utils/formatters.js";
import { ThemeToggle } from "./ThemeToggle.js";


export class DetailView {
    constructor(movie, theme) {
        this.movie = movie
        this.theme = theme
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

        const toggle = new ThemeToggle(this.theme).render()
        toggle.classList.add("theme-toggle--on-hero")

        hero.append(backdrop, back, toggle)

        const trailer = findTrailer(this.movie.videos.results)
        if (trailer) {
            hero.append(this.renderPlayButton(trailer, hero))
        }

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
        
        const star = document.createElement("span")
        star.className = "star"
        star.textContent = "★"

        rating.append(star, document.createTextNode(`${formatRating(this.movie.vote_average)}`))

        const genres = document.createElement("div")
        genres.className = "detail__genres"

        this.movie.genres.forEach((genre) => {
            const tag = document.createElement("span")
            tag.className = "tag"
            tag.textContent = genre.name

            genres.append(tag)
        });

        card.append(titleRow, rating, genres, this.renderFacts(), this.renderDescription(), this.renderCast())
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

        fact.append(labelElement, valueElement)
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

    renderCast() {
        const section = document.createElement("section")
        section.className = "detail__cast-section"

        const header = document.createElement("div")
        header.className = "section-header"

        const heading = document.createElement("h2")
        heading.className = "detail__heading"
        heading.textContent = "Cast"

        const more = document.createElement("a")
        more.className = "pill"
        more.href = "#"
        more.textContent = "See more"

        header.append(heading, more)

        const row = document.createElement("div")
        row.className = "cast-row"

        this.movie.credits.cast.slice(0, 8).forEach((person) => {
            row.append(this.renderCastMember(person))
        })

        section.append(header, row)
        return section
    }

    renderCastMember(person) {
        const member = document.createElement("div")
        member.className = "cast-member"

        const photo = document.createElement("img")
        photo.className = "cast-member__photo"
        photo.alt = person.name
        photo.loading = "lazy"

        if (person.profile_path) {
            photo.src = getImageUrl(person.profile_path, "w185")
        } else {
            photo.src = "https://placehold.co/185x185?text=No+Photo"
        }

        const name = document.createElement("span")
        name.className = "cast-member__name"
        name.textContent = person.name

        member.append(photo, name)
        return member
    }

    renderPlayButton(trailer, hero) {
        const button = document.createElement("button")
        button.className = "detail__play"
        button.setAttribute("aria-label", "Play trailer")
        button.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24">
        <path d="M8 5v14l11-7z" fill="white" />
        </svg>
    `

    button.addEventListener("click", () => {
        const frame = document.createElement("iframe")
        frame.className = "detail__backdrop"
        frame.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`
        frame.allow = "autoplay; encrypted-media"
        frame.allowFullscreen = true

        hero.querySelector(".detail__backdrop").replaceWith(frame)
        button.remove()
    })

    return button
    }


}

