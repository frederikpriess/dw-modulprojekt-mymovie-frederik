export function formatRating(voteAverage) {
    return `${voteAverage.toFixed(1)}/10IMDb`
}

export function formatRuntime(minutes) {
    const hours = Math.floor(minutes / 60)
    const remainder = minutes % 60
    return `${hours}h ${remainder}min`
}

export function getUsCertification(release_dates) {
    const us = release_dates.find((entry) => entry.iso_3166_1)
    if (!us) return null

    const withRating = us.release_dates.find((entry) => entry.certification)
    return withRating ? withRating.certification : null
}