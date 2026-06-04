import { colors, radius } from './src/tokens.ts'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pageBg:        colors.pageBg,
        cardBg:        colors.cardBg,
        sidebarBg:     colors.sidebarBg,
        sidebarHover:  colors.sidebarHover,
        activeNav:     colors.activeNavBg,
        border:        colors.border,
        borderStrong:  colors.borderStrong,
        textPrimary:   colors.textPrimary,
        textSecondary: colors.textSecondary,
        textMuted:     colors.textMuted,
        accent:        colors.accent,
        accentHover:   colors.accentHover,
        accentLight:   colors.accentLight,
        accentTint:    colors.accentTint,
        success:       colors.success,
        successLight:  colors.successLight,
        warning:       colors.warning,
        warningLight:  colors.warningLight,
        warningWash:   colors.warningWash,
        danger:        colors.danger,
        dangerLight:   colors.dangerLight,
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm:   radius.sm,
        md:   radius.md,
        lg:   radius.lg,
        xl:   radius.xl,
        pill: radius.pill,
      },
    },
  },
  plugins: [],
}
