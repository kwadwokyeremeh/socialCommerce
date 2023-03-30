/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'media',
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        themes: ['aqua', 'dark',],
    },
}
