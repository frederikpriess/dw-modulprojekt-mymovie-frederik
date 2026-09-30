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

export function findTrailer(videos) {
    const trailers = videos.filter((video) => video.type ==="Trailer" && video.site === "YouTube")
    if (trailers.length === 0) return null

    const official = trailers.find((video) => video.official)
    return official ?? trailers[0]
}