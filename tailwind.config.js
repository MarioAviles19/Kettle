/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {

    extend: {
      colors:{
        'accent-1' : 'var(--color-accent-1)',
        'subtle-light' : "var(--color-subtle-light)",
        'background-1' : 'white'
      },
      
      
    },
  },
  plugins: [],
}

