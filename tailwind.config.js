/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'page-bg': '#F5F4ED',
        'card-bg': '#FAF9F5',
        'sidebar-bg': '#F5F4ED',
        'sidebar-hover': '#EEEDE6',
        'active-nav': '#E8E6DC',
        border: '#F0EEE6',
        'border-strong': '#ECEAE3',
        'text-primary': '#141413',
        'text-secondary': '#5E5D59',
        'text-muted': '#9B9A96',
        accent: '#C96442',
        'accent-hover': '#B5522F',
        'accent-light': '#F0E6E0',
        'accent-tint': '#FDF6F3',
        success: '#09825D',
        'success-light': '#DCFCE7',
        warning: '#D97706',
        'warning-light': '#FEF3C7',
        'warning-wash': '#FFFBF0',
        danger: '#DC2626',
        'danger-light': '#FCEBEB',
      },
    },
  },
  plugins: [],
}
