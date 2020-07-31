export function validName(name, measures) {
    if(name === null || name === undefined || name.length === 0) return "Nimi ei saa olla tyhjä";

    return measures.find(measure => measure.name === name) == null ? null : "Mittari " + name + " on jo olemassa"
}

export function validFloat(text) {
    if(text === null || text === undefined) return "Syötä luku";

    text = text.replace(",", ".").trim()

    if(text.length === 0) return "Syötä luku"

    return isNaN(text) ? "Syötetty teksti ei ole luku" : null
}