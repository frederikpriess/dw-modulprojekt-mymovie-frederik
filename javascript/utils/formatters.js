export function formatRating(voteAverage) {
    return `${voteAverage.toFixed(1)}/10IMDb`
}

export function formatRuntime(minutes) {
    const hours = Math.floor(minutes / 60)
    const remainder = minutes % 60
    return `${hours}h ${remainder}min`
}