/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  	colors: {
		"primary": "#0D3B66",
		"secondary": "#D3D3D3",
		"background": "#FAF8F2",
		"accent-blue": "#1B9AAA",
		"accent-orange": "#FF6B35",
		"error": "#FE3B11",
		"light-gray": "#b9b9b9",
	}
  },
  plugins: [],
}

