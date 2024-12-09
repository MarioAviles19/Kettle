/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {

    extend: {
      colors:{
        'accent-1' : 'var(--color-accent-1)',
        'subtle-light' : "var(--color-subtle-light)",
        'soft-black' : "black",
        'background-1' : 'white',
        'light-emphasis' : "var(--color-light-emphasis)",
        'subtle-light-hard' : "var(--color-subtle-light-hard)",
      },
      screens: {
        'print': {'raw': 'print'},
        // => @media  print { ... }
      },
      boxShadow: {
        'border' : '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1), 0 -1px 3px 0 rgb(0 0 0 / 0.1), 0 -1px 2px -1px rgb(0 0 0 / 0.1)'
      },
      width: {
        "clamp-sm" : "50rem"
      },
      maxWidth: {
        "clamp-sm" : "50rem"
      }
      
      
    },
  },
  plugins: [],
}

