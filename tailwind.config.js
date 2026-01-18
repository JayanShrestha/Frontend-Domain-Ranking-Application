export default {
  content: [
     "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      colors:{
        brandPurple: '#8c52ff'
      }
    },
  },
  variants:{
    extend:{},
  },
  plugins: [],
}

