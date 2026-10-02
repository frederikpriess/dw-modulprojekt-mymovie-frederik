import { debounce } from "../utils/debounce.js";

export class SearchBar {
    constructor(onSearch) {
        this.onSearch = onSearch
    }

    render() {
        const wrapper = document.createElement("div")
        wrapper.className = "search-bar"

        const input = document.createElement("input")
        input.type = "search"
        input.className = "search-bar__input"
        input.placeholder = "Search Movies..."

        const debouncedSearch = debounce((query) => {
            this.onSearch(query.trim())
        }, 300)

        input.addEventListener("input", () => {
            debouncedSearch(input.value)
        })

        wrapper.append(input)
        return wrapper
    }
}