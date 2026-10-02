import { PopularCard } from "./PopularCard.js";
import { fetchPopular } from "../api/tmdb.js";

const BATCH_SIZE = 10
const TRIGGER_OFFSET = 3


export class PopularList {
    constructor(movies,genreMap) {
        this.movies = movies
        this.genreMap = genreMap
        this.container = null
        this.visibleCount = BATCH_SIZE
        this.page = 1
        this.loading = false

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.observer.unobserve(entry.target)
                    this.loadMore()
                }
            })
        })
    }

    render() {
        this.container = document.createElement("div")
        this.container.className = "popular-list"
        this.appendCards(this.movies.slice(0, this.visibleCount))
        return this.container
    }

    appendCards(movies) {
        const elements = movies.map((movie) => {
            const card = new PopularCard(movie, this.genreMap)
            const element = card.render()
            this.container.append(element)
            return element
        })
        this.watchTrigger(elements)
    }

    watchTrigger(elements) {
        const triggerIndex = Math.max(elements.length - TRIGGER_OFFSET, 0)
        const triggerCard = elements[triggerIndex]

        if (triggerCard) {
            this.observer.observe(triggerCard)
        }
    }

    async loadMore() {
        if (this.loading) return

        if (this.visibleCount >= this.movies.length){
            this.loading = true
            this.page += 1
            const nextPage = await fetchPopular(this.page)
            this.movies = [...this.movies, ...nextPage]
            this.loading = false
    }

    if (this.visibleCount >= this.movies.length) return

    const previousCount = this.visibleCount
    this.visibleCount += BATCH_SIZE
    this.appendCards(this.movies.slice(previousCount, this.visibleCount))
    }
}