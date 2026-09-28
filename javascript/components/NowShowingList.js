import { NowShowingCard } from "./NowShowingCard.js";

export class NowShowingList {
    constructor(movies) {
        this.movies = movies
    }

    render() {
        const row = document.createElement("div")
        row.className = "movie-row"

        this.movies.forEach((movie) => {
            row.append(new NowShowingCard(movie).render())
            
        });

        return row
    }
}