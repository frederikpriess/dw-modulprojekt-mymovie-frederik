import { ThemeToggle } from "./ThemeToggle.js"

export class Header {
    constructor(theme) {
        this.theme = theme
    }

    render() {
        const header = document.createElement("header")
        header.className = "site-header"

        const title = document.createElement("h1")
        title.className = "site-header__title"
        title.textContent = "MyMovies"

        const toggle = new ThemeToggle(this.theme).render()

        header.append(title, toggle)
        return header
    }
}