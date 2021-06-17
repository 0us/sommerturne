module.exports = {
    purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            boxShadow: ["disabled"],
            translate: ["disabled"],
            scale: ["disabled"],
            animation: ["responsive", "motion-safe", "motion-reduce"],
        },
    },
    plugins: [],
}
