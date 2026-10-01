const STORAGE_KEY = "mymovies-theme"

export class ThemeManager {
    constructor() {
        this.theme = this.load()
        this.apply()
    }

    load() {
        return localStorage.getItem(STORAGE_KEY) ?? "light"
    }

    save() {
        localStorage.setItem(STORAGE_KEY, this.theme) 
    }

    apply() {
        document.documentElement.setAttribute("data-theme", this.theme)
    }

    isDark() {
        return this.theme ==="dark"
    }

    toggle() {
        this.theme = this.isDark() ? "light" : "dark"
        this.save()
        this.apply()
    }
}