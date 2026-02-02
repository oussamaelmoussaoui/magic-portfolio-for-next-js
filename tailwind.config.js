/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      "shadow": {
        'shadow-element': '[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]'
      },
      "colors": {
        'blue': {
          '50': '#e8f1ff',
          '100': '#d5e4ff',
          '200': '#b3ccff',
          '300': '#85a8ff',
          '400': '#5676ff',
          '500': '#2f45ff',
          '600': '#0c0eff',
          '700': '#0000ff',
          '800': '#0609cd',
          '900': '#10169f',
          '950': '#0a0b5c',
        }
      },
    },
    plugins: [],
  },
}
