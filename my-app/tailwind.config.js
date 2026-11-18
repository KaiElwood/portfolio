/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        garden: {
          background: 'var(--garden-background)',
          surface: 'var(--garden-surface)',
          ink: 'var(--garden-ink)',
          muted: 'var(--garden-muted)',
          coral: 'var(--garden-coral)',
          lilac: 'var(--garden-lilac)',
          butter: 'var(--garden-butter)',
          border: 'var(--garden-border)',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            lineHeight: '1.7',
            '--tw-prose-body': 'var(--garden-ink)',
            '--tw-prose-headings': 'var(--garden-ink)',
            '--tw-prose-lead': 'var(--garden-muted)',
            '--tw-prose-links': 'var(--garden-lilac)',
            '--tw-prose-bold': 'var(--garden-ink)',
            '--tw-prose-counters': 'var(--garden-muted)',
            '--tw-prose-bullets': 'var(--garden-coral)',
            '--tw-prose-hr': 'var(--garden-border)',
            '--tw-prose-quotes': 'var(--garden-ink)',
            '--tw-prose-quote-borders': 'var(--garden-coral)',
            '--tw-prose-captions': 'var(--garden-muted)',
            '--tw-prose-code': 'var(--garden-butter)',
            '--tw-prose-pre-code': 'var(--garden-ink)',
            '--tw-prose-pre-bg': 'var(--garden-surface)',
            '--tw-prose-th-borders': 'var(--garden-border)',
            '--tw-prose-td-borders': 'var(--garden-border)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
