export function formatFloat(text) {
    return parseFloat(text.replace(",", ".").trim())
}