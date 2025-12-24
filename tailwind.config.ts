// Tailwind CSS configuration with custom breakpoint for >400px
import type { Config } from 'tailwindcss';

const config = {
  theme: {
    extend: {
      screens: {
        'max-400': {'raw': '(max-width: 399px)'},
      },
    },
  },
  plugins: [],
};

export default config;
