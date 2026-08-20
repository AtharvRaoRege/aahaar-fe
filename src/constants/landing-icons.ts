/**
 * Stroked marks used across the landing page, as raw 24x24 path data.
 *
 * Path strings rather than JSX so one small component can render any of them and
 * the icon set stays a data table instead of forty near-identical components.
 * Circles and rounded rectangles are expressed as arcs for the same reason.
 */
export const LINE_ICON_PATHS = {
  qr: [
    'M3 3h7v7H3z',
    'M14 3h7v7h-7z',
    'M3 14h7v7H3z',
    'M14 14h3v3h-3z',
    'M19 14v3',
    'M14 19h3',
    'M19 19h2',
  ],
  search: ['M4 10a6 6 0 1 0 12 0a6 6 0 1 0-12 0', 'M15 15l6 6'],
  plusCircle: ['M12 3v18', 'M3 12h18', 'M2 12a10 10 0 1 0 20 0a10 10 0 1 0-20 0'],
  pin: [
    'M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z',
    'M10 9a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
  ],
  spice: [
    'M12 1v3M12 20v3M4 12H1M23 12h-3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2',
    'M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0',
  ],
  cart: [
    'M3 3h2l2.4 12.2a2 2 0 0 0 2 1.8h7.2a2 2 0 0 0 2-1.6L21 8H6',
    'M8 20a1 1 0 1 0 2 0a1 1 0 1 0-2 0',
    'M17 20a1 1 0 1 0 2 0a1 1 0 1 0-2 0',
  ],
  lock: [
    'M6 9V6a6 6 0 0 1 12 0v3',
    'M6 9h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z',
  ],
  bell: ['M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9', 'M13.7 21a2 2 0 0 1-3.4 0'],
  calendar: [
    'M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
    'M8 4v4M16 4v4M4 10h16',
  ],
  lines: ['M4 6h16M4 12h16M4 18h10'],
  star: ['M12 17.3l-6.2 3.3 1.2-6.9L2 8.9l7-1L12 1.5l3 6.4 7 1-5 4.8 1.2 6.9z'],
  sound: [
    'M9 18V6l12-2v12',
    'M3 18a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
    'M15 16a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
  ],
  filter: ['M4 6h16M4 12h16M4 18h7', 'M17 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0'],
  checkCircle: ['M22 11.08V12a10 10 0 1 1-5.93-9.14', 'M22 4L12 14.01l-3-3'],
  refresh: [
    'M23 4v6h-6M1 20v-6h6',
    'M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
  ],
  table: [
    'M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
    'M3 10h18M8 4v16',
  ],
  layers: ['M12 2L2 7l10 5 10-5-10-5z', 'M2 17l10 5 10-5M2 12l10 5 10-5'],
  users: [
    'M5 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0',
    'M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2',
    'M16 8a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
  ],
  grid4: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M3 14h7v7H3z', 'M14 14h7v7h-7z'],
  grid3: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M3 14h7v7H3z'],
  home: ['M3 21V9l9-6 9 6v12', 'M9 21v-6h6v6'],
  check: ['M20 6L9 17l-5-5'],
  doc: [
    'M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
    'M8 8h8M8 12h8M8 16h5',
  ],
  chat: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'],
  clock: ['M2 12a10 10 0 1 0 20 0a10 10 0 1 0-20 0', 'M12 6v6l4 2'],
  pulse: ['M3 12h4l3-9 4 18 3-9h4'],
  qrSquare: [
    'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
    'M9 9h6v6H9z',
  ],
  upload: ['M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6', 'M2 7l10-5 10 5-10 5-10-5z'],
  help: ['M2 12a10 10 0 1 0 20 0a10 10 0 1 0-20 0', 'M9 9a3 3 0 1 1 5 2c-1 1-2 2-2 3M12 17h.01'],
  sparkle: ['M12 2l2.4 6.6L21 9l-5 4.5L17.5 21 12 17l-5.5 4 1.5-7.5L3 9l6.6-.4z'],
  chili: ['M4 5c3-2 6-1 8 1 3 3 8 2 8 7 0 4-4 6-8 4-4-2-9-2-10-6-1-3 0-5 2-6z'],
  leaf: [
    'M8 2c0 4-3 4-3 8a3 3 0 0 0 6 0c0-4-3-4-3-8z',
    'M16 4c0 3-2 3-2 6a2 2 0 0 0 4 0c0-3-2-3-2-6z',
  ],
  clockSmall: ['M4 12a8 8 0 1 0 16 0a8 8 0 1 0-16 0', 'M12 8v4l3 2'],
  loop: ['M4 12a8 8 0 1 1 3 6.2', 'M4 18v-4h4'],
  dots5: [
    'M10.8 12a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0-2.4 0',
    'M4.8 9a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0-2.4 0',
    'M16.8 15a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0-2.4 0',
    'M4.8 15a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0-2.4 0',
    'M16.8 9a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0-2.4 0',
  ],
  plant: ['M12 3v18M6 8l6-5 6 5'],
  rupee: [
    'M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0',
    'M9 9c0-1.7 1.3-3 3-3s3 1.3 3 3M9 15c0 1.7 1.3 3 3 3s3-1.3 3-3M8 12h8',
  ],
  coin: ['M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0', 'M8 12h8'],
  steam: ['M9 3c0 2-2 2-2 4s2 2 2 4M15 3c0 2-2 2-2 4s2 2 2 4'],
  bellPlain: ['M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9'],
  clock9: ['M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0', 'M12 7v5l4 2'],
} as const

export type LineIconName = keyof typeof LINE_ICON_PATHS
