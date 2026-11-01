import type { ThemeKey } from './types';

// Edit colors here. The CSS variables are generated from this object.
export const THEMES: Record<ThemeKey, {
  label: string; desc: string; bg: string; surface: string; primary: string; accent: string;
  text: string; muted: string; border: string; onPrimary: string; markDark: string; markLight: string;
  radius: string; heading: string; body: string;
}> = {
  corporate_blue: {
    label: 'Orange (Padmaarc Ignite)',
    desc: 'Deep ink with a bold orange call-to-action and a violet glow. Built for performance advertising.',
    bg: '#0B0F1A', surface: '#141B2D', primary: '#FF6B35', accent: '#7C5CFF',
    text: '#F5F7FB', muted: '#A7B0C6', border: '#232C44', onPrimary: '#0B0F1A',
    markDark: '#FF6B35', markLight: '#FFB38F',
    radius: '12px',
    heading: "'Plus Jakarta Sans', Inter, system-ui, sans-serif",
    body: "Inter, system-ui, sans-serif",
  },
  emerald_growth: {
    label: 'Green (Padmaarc Lotus)',
    desc: 'Deep teal and soft sage, taken from the Padmaarc lotus logo. Calm and premium.',
    bg: '#06201A', surface: '#0C2C25', primary: '#84B6A4', accent: '#2FA58C',
    text: '#EEF6F2', muted: '#9EBDB2', border: '#18443B', onPrimary: '#06201A',
    markDark: '#1F7F6C', markLight: '#9CCBB8',
    radius: '12px',
    heading: "'Plus Jakarta Sans', Inter, system-ui, sans-serif",
    body: "Inter, system-ui, sans-serif",
  },
};

export function isThemeKey(value: string): value is ThemeKey {
  return Object.prototype.hasOwnProperty.call(THEMES, value);
}

export function themeCss(key: ThemeKey): string {
  // Only the selected theme's variables are written, so no other theme can show up on the page.
  const t = THEMES[key];
  return `:root[data-theme="${key}"]{--bg:${t.bg};--surface:${t.surface};--primary:${t.primary};--accent:${t.accent};--text:${t.text};--muted:${t.muted};--border:${t.border};--on-primary:${t.onPrimary};--mark-dark:${t.markDark};--mark-light:${t.markLight};--radius:${t.radius};--font-heading:${t.heading};--font-body:${t.body};}`;
}
