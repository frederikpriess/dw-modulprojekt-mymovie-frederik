export class Header {
    constructor(theme, onToggleTheme) {
        this.theme = theme
        this.onToggleTheme = onToggleTheme
    }

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

        if (this.theme.isDark()) {
            toggle.classList.add("theme-toggle--on")
        }

        toggle.addEventListener("click", () => {
            this.onToggleTheme()
            toggle.setAttribute("aria-checked", String(this.theme.isDark()))
            toggle.classList.toggle("theme-toggle--on", this.theme.isDark())
        })



        header.append(title, toggle)
        return header
    }
}