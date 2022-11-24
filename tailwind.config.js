/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './node_modules/flowbite-react/**/*.js',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                //màu cam
                orange: { DEFAULT: '#ff7010' },
               

            }

        },
    },
    plugins: [require('flowbite/plugin'), require("daisyui")],
};
