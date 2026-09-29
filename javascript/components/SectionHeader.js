export class SectionHeader {
    constructor(title) {
        this.title = title
    }

    render() {
        const row = document.createElement("div")
        row.className = "section-header"

        const heading = document.createElement("h2")
        heading.className = "section-header__title"
        heading.textContent = this.title

        const more = document.createElement("a")
        more.className = "pill"
        more.href = "#"
        more.textContent = "See more"

        row.append(heading, more)
        return row
    }
}