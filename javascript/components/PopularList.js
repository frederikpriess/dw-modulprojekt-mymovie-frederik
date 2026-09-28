import { PopularCard } from "./PopularCard.js";

export class PopularList {
    constructor(movies,genreMap) {
        this.movies = movies
        this.genreMap = genreMap
    }

    render() {
        const list = document.createElement("div")
        list.className = "popular-list"

        this.movies.forEach((movie) => {
            list.append(new PopularCard(movie, this.genreMap).render()) 
        });

        return list
    }
}