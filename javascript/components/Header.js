export class Header {
    render() {
        const header = document.createElement("header")
        header.className = "site-header"

        const title = document.createElement("h1")
        title.className = "site-header__title"
        title.textContent = "MyMovies"

        const toggle = document.createElement("button")
        toggle.className = "theme-toggle"
        toggle.setAttribute("role", "switch")
        toggle.setAttribute("aria-checked", "false")
        toggle.setAttribute("aria-label", "Dark mode")

        header.append(title, toggle)
        return header
    }
}