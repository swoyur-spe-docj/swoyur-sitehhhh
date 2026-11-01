# Changelog

## 1.3.1 — Theme everywhere

- The theme chosen in Settings is saved in a cookie as well, so the error page shows the same theme even if the main layout fails. Before, it always showed orange.
- Every icon in the menu and footer (email, Instagram) now follows the theme colour instead of fixed brand colours.
- Confirmed the site is rendered fresh on every request and the theme change refreshes all pages immediately.

## 1.3.0 — Conversion and case studies

- Case studies: portfolio items can have a web address, client name, challenge, what we did, and result. Each published case study gets its own page at /portfolio/<address>. Portfolio cards link to it.
- Floating WhatsApp button on every public page (uses the WhatsApp number from Settings).
- Mobile bottom bar with Call, WhatsApp, and Enquire buttons.
- Migration `0009_case_studies.sql` adds the case study fields. Run it before using them.

## 1.2.0 — Team accounts, roles, and order assignment

- Team page (admin): add people with a name, email, role, and password; change roles; turn access on or off; reset passwords.
- Four roles: Admin (everything), Manager (orders, payments, clients, reports, and assigning orders), Editor (portfolio and media), Designer (only assigned orders: the brief and team notes).
- Each role has its own home screen and sidebar. Pages and actions are checked on the server, not only hidden in the menu.
- Staff sign in with email and password (scrypt-hashed). The owner still signs in with the `ADMIN_PASSWORD` by leaving the email field empty.
- Sessions now identify the person and role. Deactivating someone or changing their role takes effect on their next request.
- Orders can be assigned to a team member from the order page; designers see their assigned orders under "My tasks".
- Migration `0008_staff_roles.sql` adds the team table and the order assignment column. See `TEAM-ROLES.md`.

## 1.1.0 — Media uploads for images and videos

- Admin → Media library: every image and video on the website can be replaced by uploading a file (JPG, PNG, WebP, GIF, MP4, WebM). A web address can still be pasted instead.
- Add new media: name it, choose image or video, upload. Added items appear in a "More from the studio" gallery on the portfolio page.
- Added items can be deleted; the stored file is removed too. Built-in website slots can be replaced but not deleted.
- Uploads go straight from the browser to secure cloud storage with a one-time signed link. Limits: images 10 MB, videos 100 MB.
- Migration `0007_site_media.sql` creates the public storage bucket and the new media columns. Run it before using uploads.

## 1.0.0 — Live release

- Security: Next.js upgraded to the patched 14.2.x line (^14.2.25), which fixes the middleware authorisation bypass (CVE-2025-29927). The old lock file was removed so `npm install` pins the patched version.
- Security headers: Cross-Origin-Opener-Policy and X-Permitted-Cross-Domain-Policies added; X-Powered-By removed.
- Admin pages (login and panel) are marked noindex and not cached; robots.txt blocks /admin/.
- Release contains no .env.local. Create it from .env.example on your machine or set the variables in the host.
- Earlier protections kept: httpOnly, SameSite and secure admin cookies; per-IP login rate limit; signed 8-hour admin sessions; strict CSP with nonces; required strong admin password and session secret.

## 0.9.3 — Admin navigation fixes and login page

- Fixed: "Open public website" and "Back to Padmaarc" links in the admin opened the admin subdomain and bounced back. They now use the absolute public address (NEXT_PUBLIC_SITE_URL).
- New "Back to public site" button in the admin sidebar.
- Login page: a signed-in admin is sent straight to the dashboard; the login card has a soft brand glow, staggered entrance, focus ring, and a shake on a wrong password.
- Motion disabled for reduced-motion users.

## 0.9.2 — Motion for both themes

- Orange (Ignite) motion is energetic and quick: faster page entrance, quicker ticker, livelier featured ring and card lift.
- Green (Lotus) motion is calm and slower: softer page entrance, slower ticker and light drift, gentler card lift and button press.
- Green accent brightened so glows, rings and the progress bar are visible on the dark green background.

## 0.9.1 — Only the selected theme, more motion

- Only the selected theme is written to the page. Switching in Settings changes everything at once: colours, buttons, cards, and the logo mark.
- The lotus logo is now an inline mark that takes its colours from the active theme (orange or green), so no orange logo appears on the green theme and vice versa.
- New motion: page banners get a slow light drift; section dividers draw in on scroll; form fields glow on focus; contact links underline on hover; footer social icons wiggle; admin filter chips pop when active.
- All motion disabled for reduced-motion users.

## 0.9.0 — Theme chooser, secure setup, admin polish

- Admin → Settings → Website theme: choose Orange (Padmaarc Ignite) or Green (Padmaarc Lotus). The whole site, the admin panel, the error page, and the browser theme colour follow the saved choice. Default is orange.
- Migration `0006_default_orange_theme.sql` sets orange as the default for new installs.
- Security: the admin password must be at least 12 characters and cannot be a placeholder; `ADMIN_SESSION_SECRET` (32+ characters) is required in production. Enforced both in the app and in `npm run check-env`.
- New `.env.local` template with placeholders only, a clean `.env.example`, and `ENV-SETUP.md` with every variable, where to find it, and a go-live security checklist.
- Admin polish: selected theme card lights up with its colours, sidebar accent bar, stat card underline, notice accent edge, button depth, and reduced-motion support.

## 0.8.3 — Admin panel checks

- Orders list: a page number like `?page=abc` or a negative page no longer breaks pagination (falls back to page 1).
- Static audit of the admin panel: every repository function the admin calls exists; every local import resolves; every form field name matches what its action reads; every settings and entity field used on admin pages exists in the types; every admin action checks the admin session.

## 0.8.2 — Menu descriptions and page-specific footers

- Mobile menu: each link has a one-line description; the active or hovered link shows an orange-to-violet accent bar.
- Footer: every page now has its own three highlight cards that point to the most useful next steps for that page (for example, the services page suggests packages, work, and contact).
- Motion disabled for reduced-motion users.

## 0.8.1 — No green anywhere on the site

- Removed every green from the theme: paid and active status pills, success notices, media previews, the hero chip, the WhatsApp menu button (now theme accent), and the email brand icon.
- The site's lotus mark now uses the orange theme colours (`public/padmaarc-mark-ignite.svg`). The original `padmaarc-mark.svg` and `padmaarc-logo.png` are kept unchanged as the client's brand files.

## 0.8.0 — Ignite orange theme with motion

- Theme switched back to Padmaarc Ignite: ink background, bold orange call-to-action, violet glow. Used everywhere: site, admin, error page, and browser theme colour.
- Internal theme key stays `emerald_growth` so the existing database constraint keeps working. Only the palette and label changed.
- Every page content eases in on navigation.
- Featured package has a slow orange-to-violet light ring around its border.
- Hero accent word: an orange underline draws in.
- Section eyebrows get an orange glowing dot.
- Primary button gradient kept in the orange family.
- Motion disabled for reduced-motion users.

## 0.7.1 — Lotus green finish

- Scroll progress bar in lotus green with a soft glow.
- Hero: faint dot grid for depth.
- Primary buttons: soft green gradient fill.
- Cards: green hairline draws across the top on hover.
- Section headings: soft light fades in as they scroll into view (modern browsers).
- Footer: green hairline above the bottom bar.
- Motion disabled for reduced-motion users.

## 0.7.0 — One theme: Padmaarc Lotus

- Fixed: the old theme could come back after saving or when older saved settings existed, because two theme sources disagreed. The site now has a single theme (Padmaarc Lotus green) and every page always uses it.
- Services ticker under the hero: a slow, seamless loop of services with faded edges; pauses on hover.
- Section headings rise in as they scroll into view (modern browsers).
- Motion disabled for reduced-motion users.

## 0.6.4 — Responsive check tooling

- `npm run screens` now captures six sizes: 360, 390, 768 (tablet), 1280 (laptop), 1440 (desktop), and 1920 (monitor), for every public and admin page.
- Source audit: all TypeScript and TSX files parse cleanly; CSS braces balanced; no old theme colours left; no secret files in the zip.

## 0.6.3 — Footer brand, menu and back-to-home motion

- Footer on every page: logo lockup (lotus mark and studio name), a line about what the brand does on that page, and service chips (Strategy, Design, Video, Influencers, Meta Ads).
- Mobile menu: the button's bars morph into an X; the drawer slides in and links fade in one by one.
- Back to home: pill button with a circular arrow that moves on hover and a soft lift on click.
- Motion disabled for reduced-motion users.

## 0.6.2 — Buttons and packages motion

- Buttons: soft light sheen on hover, slight press squish on click.
- Packages: price pops in, feature ticks draw in one after another, full-width package buttons, price takes the accent colour on hover.
- Motion disabled for reduced-motion users.

## 0.6.1 — Lotus lighting pass

- Soft teal and sage ambient light across the site, matching the logo theme.
- Hero: a faint light slowly drifts behind the headline; the hero image reveals softly on load.
- Card images settle into place as cards scroll into view (modern browsers).
- Section eyebrow lines draw in as sections appear.
- Motion is disabled for reduced-motion users.

## 0.6.0 — Client logo theme

- New default theme "Padmaarc Lotus": colours taken from the client's logo (deep teal and soft sage on a calm, premium base).
- Public site, admin panel, error page, and browser theme colour all use the logo theme by default.
- Existing saved theme choices are kept. New installs start on the logo theme.
- Note: `public/padmaarc-logo.png` has a black background. The header and footer use the transparent lotus mark (`padmaarc-mark.svg`). Use a transparent PNG if the full logo is shown on dark backgrounds.

## 0.5.6 — Professional finish

- Removed decorative effects that made the design look generic: headline shimmer, pulsing featured-plan halo, glowing footer edge, breathing logo glow, floating decorative mark, focus ring pulse, card spotlight, and button sweep.
- Kept functional motion only: entrance fades, scroll reveals, hover lift, nav underline.
- Tighter headings and eyebrow text, calmer card and button hover, consistent section spacing, hairline footer separator.

## 0.5.5 — Footer, logo and section polish

- Footer: animated glowing top edge, staggered reveal of columns, links slide on hover, social buttons lift and glow.
- Logo: gentle breathing glow in the header and admin sidebar; rotates and glows on hover.
- Cards: soft light follows the top of the card on hover; package feature items slide in one after another.
- Steps: connector line draws between steps.
- All motion disabled for reduced-motion users.

## 0.5.4 — Full motion system (website + admin)

- Page banners, hero buttons, and enquiry form fields animate in with staggered timing.
- Contact methods slide on hover; service arrows nudge; footer links lift.
- Images zoom gently on card hover; decorative mark floats softly.
- Admin: sidebar and top bar slide in, stat cards pop in, cards and table rows fade in one after another, notices slide in, focus rings glow on inputs, filter chips and status pills respond on hover.
- All motion is disabled for users who turn on reduced-motion.

## 0.5.3 — Motion pass 2

- Scroll reveals: cards and sections fade and rise as they enter the screen (modern browsers; others show content normally).
- Primary buttons get a light sweep on hover.
- Headline highlight has a slow colour shimmer.
- Nav links draw an underline on hover; featured package has a soft breathing halo.
- Service numbers pop on card hover.
- All motion is off for users with reduced-motion enabled.

## 0.5.2 — Second theme: Padmaarc Emerald

- Added the "Padmaarc Emerald" green theme. Admin → Settings → Website theme lets you pick either theme.
- Migration `0005_add_emerald_theme.sql` must be run before saving the new theme.
- Settings now keep any valid saved theme instead of forcing the default.

## 0.5.1 — Real screenshot tool

- Added `npm run screens`: captures screenshots of every public and admin page on desktop and mobile from the real running app.

## 0.5.0 — New theme: Padmaarc Ignite

- New ads-agency theme: deep ink background, bold orange call-to-action, violet glow. Set in lib/themes.ts (edit colours there).
- Theme key stays `corporate_blue` so saved settings keep working; only colours and the label changed.
- Replaced fixed green accents (live status dot, scroll progress, error page) with theme colours so they follow the theme.
- WhatsApp and success/paid status colours are kept as their brand/semantic colours.

## 0.4.3 — Bug fixes and section polish

- Fixed: enquiry success and error messages did not show on the home page after submitting the form.
- Fixed: "Mark done" on the admin Enquiries page gave no feedback; success and error notices now show.
- Section headings have a refined accent line, balanced line wrapping, and tighter mobile spacing.

## 0.4.2 — Visual polish and motion

- Added soft ambient lighting across all pages, glass-style sticky header, and glow on key imagery.
- Buttons and cards have tactile hover and press feedback; primary buttons carry a soft glow.
- Headlines, eyebrows and intro text animate in on page load; hero stamp gently floats.
- Added visible keyboard focus styles and themed text selection.
- All animation is disabled for users who set reduced-motion in their device settings.

## 0.4.1 — Client handoff polish

- Fixed the black/unstyled background after navigating to other pages and on error pages: theme colours now have built-in defaults, and the global error page sets the theme.
- Images never show as empty boxes: a fallback placeholder appears if a photo fails to load (applies to all public pages and portfolio cards).
- Fixed saved media entries with blank fields overriding the default image URL.
- Contact page and enquiry form now lay out in one column on tablets and phones and stack buttons on small screens.
- Admin tables scroll inside their card on small screens instead of breaking the layout.

## 0.4.0 — Supabase-backed business flows

- Replaced the in-memory business repository with server-only Supabase REST persistence.
- Added migration `0004_business_backend.sql` for customer orders, private receipt tokens, payments, activation, clients, quota tracking, enquiries, packages, portfolio, settings, media URLs, and Meta Ads records.
- Made payment recording, order-state transitions, package activation, package saves, and quota increments transactional database RPCs.
- Signed admin sessions so they work across server instances and expire after eight hours.
- Added `npm run check:backend` to check for the migration tables, RPCs, and active packages.

## 0.3.0 — Foundation and safety (partial)

- Added required environment validation and a setup screen; the Supabase service-role key is only read by server code.
- Added nonce-based Content Security Policy and baseline security headers.
- Added server-side rate-limit calls for login, checkout, and enquiries, plus migration `0003_safety_baseline.sql` with an atomic Supabase RPC and timestamp/index hygiene.
- Added generic retryable error pages, route loading skeletons, environment/connectivity and client-bundle secret checks, and backup/export setup notes.
- The durable limit migration and database connectivity still require the owner’s service-role key and an applied Supabase schema. The business repository remains in memory; this release is not the full 0.3.0 client handoff described in the plan.

## 0.1.0 — Initial version

- Added a responsive public marketing site, package checkout, order confirmation, portfolio, and contact enquiry form.
- Added the in-memory order, payment, client quota, package, portfolio, enquiry, Meta Ads, report, and settings workflows.
- Added admin session login, domain split middleware, four themes, CSV export, and setup documentation.
- Added the Padmaarc monogram, dark editorial branding with a working light-mode toggle, separate About and Services pages, Journal and Careers states, social profile settings, and SEO sitemap/robots routes.
- Added a Supabase CMS/RBAC schema and a development-only test-user seeder. The existing order repository remains in memory pending credentials and backend integration.
- Confirmed the Next.js production build and TypeScript checks pass.
