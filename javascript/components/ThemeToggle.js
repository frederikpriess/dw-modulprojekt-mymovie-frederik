export class ThemeToggle {
    constructor(theme) {
        this.theme = theme
    }
    
    render() {
        const toggle = document.createElement("button")
        toggle.className = "theme-toggle"
        toggle.setAttribute("role", "switch")
        toggle.setAttribute("aria-checked", String(this.theme.isDark()))
        toggle.setAttribute("aria-label", "Dark mode")
        if (this.theme.isDark()) {
            toggle.classList.add("theme-toggle--on")
        }
        toggle.addEventListener("click", () => {
            this.theme.toggle() 
            toggle.setAttribute("aria-checked", String(this.theme.isDark()))
            toggle.classList.toggle("theme-toggle--on", this.theme.isDark())
        })

        return toggle
    }

}