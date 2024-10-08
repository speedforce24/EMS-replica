import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      
      colors:{
        customBlack: 'rgba(9, 9, 9, 0.7)',
        customWhite:'rgba(255, 255, 255, 1)',
        customGreen:' rgba(0, 25, 25, 1)',
        customBlack2:'rgba(5, 13, 28, 1)',
        customBlack3:'rgba(16, 25, 40, 1)',
        customWhite2:'rgba(244, 248, 247, 1)',
        customWhite4:"rgba(247, 247, 247, 1)",
        customYellow:'rgba(243, 162, 24, 1)',
        customWhite3:'rgba(255, 255, 255, 1)',
        customGrey:'rgba(249, 250, 251, 1)',
        customGrey2:'rgba(232, 236, 244, 1)',
        customArrow:'rgba(0, 0, 0, 0.1)',
        customAqua:' rgba(53, 194, 193, 1)',
        customGrey3:'rgba(131, 145, 161, 1)',
        customOrange:'rgba(255, 144, 83, 1)',
        customPeach:'rgba(252, 222, 219, 1)',
        customICON:"rgba(75, 70, 92, 0.08)",
        customBorder:'rgba(189, 195, 205, 1)'
},
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
    },
  },
  plugins: [],
};
export default config;
