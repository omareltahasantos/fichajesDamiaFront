export function showSnackbar(setSnackbar, text, color) {
    setSnackbar({
        open: true,
        text: text,
        color: color,
    })
}
