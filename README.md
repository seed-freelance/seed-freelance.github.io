# Seed AI — seedfreelance.com

Bilingual (EN/FR) single-page freelance site for Pierre Aumjaud, built with
Hugo extended and deployed to GitHub Pages. English is served at `/`,
French at `/fr/`.

## Stack

- **Hugo extended** — CI is pinned to **v0.165.0** (`.github/workflows/deploy.yml`).
  Any ≥ 0.146 works locally (this machine runs 0.162.1+extended); install the
  pinned version for exact parity.
- Custom theme in `layouts/` — no external theme, no submodules.
- Vanilla JS (~1 KB gzipped): scrollspy, filter deep-links, form submit.
  Everything works with JavaScript disabled.
- Contact form: [Web3Forms](https://web3forms.com/) (relay-only, no stored
  submissions).

## Local development

```sh
hugo server                      # http://localhost:1313, both languages
HUGO_WEB3FORMS_KEY=xxx hugo server   # with the contact form enabled
hugo --gc --minify               # production build into public/
```

Without `HUGO_WEB3FORMS_KEY` the contact section shows a "form not
configured" notice instead of the form — builds never fail because of it.

## Adding a portfolio item

Create a bundle under `content/portfolio/<slug>/` with `index.md` (English),
`index.fr.md` (French), and the screenshot file(s). No HTML needed.

```yaml
---
title: "Project name"
tagline: "One-line value proposition."
categories: ["ai-engineering"]        # and/or "web-development" — an item may have several
project_type: "client"                # or "personal"
client: "Client name"                 # shown when project_type is client
featured: true                        # optional: full-width card, place first via weight
weight: 50                            # sort order (lower = earlier)
screenshot: "shot.png"                # file in this bundle; omit for a text-led card
screenshot_alt: "Meaningful description of the image."
tech:                                 # grouped tags
  - group: "AI"
    items: ["LlamaIndex", "ChromaDB"]
metrics:                              # optional: renders the large stat block
  - figure: "97"
    symbol: "%"                       # French files: use a narrow no-break space, " %"
    label: "accuracy doing X"
specs:                                # optional: mono spec list for cards without metrics
  - "Engineering specifics that carry credibility"
showcase:                             # optional: multi-site cluster (see static-sites)
  - name: "Site"
    url: "https://example.com/"
    screenshot: "site.png"
    note: "One-liner."
testimonial: ""                       # renders a quote block only when non-empty
testimonial_author: ""
links:
  - kind: "site"                      # site | code | writeup (labels come from i18n)
    url: "https://example.com/"
---
Two to four sentences: problem → what I built → result.
```

Both language files share the bundle's screenshots. Categories are declared
per item; the filter buttons and their CSS are generated from whatever
categories exist — to add a category, use it in front matter and add
`cat_<id with underscores>` to `i18n/en.toml` and `i18n/fr.toml`.

## Adding or editing services

Edit `data/services.yaml` — each entry has per-language `title`/`description`
and a `filter` pointing at a portfolio category.

All other UI strings live in `i18n/en.toml` and `i18n/fr.toml`; templates
contain no hardcoded user-facing text.

## Contact form configuration

1. Create a free access key at web3forms.com for the destination inbox
   (seed.ai.freelance@gmail.com).
2. In the GitHub repo: Settings → Secrets and variables → Actions → add a
   secret named **`WEB3FORMS_KEY`** with the access key.
3. Locally, export `HUGO_WEB3FORMS_KEY` (e.g. from a git-ignored `.env`).

The key is injected at build time and never committed. Spam protection is a
honeypot field (`botcheck`). With JS the form submits inline with localized
success/error messages; without JS it POSTs and returns to the site's own
`/thanks/` (EN) or `/fr/merci/` (FR) page.

## Deploying

Every push to `main` builds and deploys via `.github/workflows/deploy.yml`
(GitHub Pages, official actions flow — no `public/` in git). One-time setup:

1. Repo Settings → Pages → Source: **GitHub Actions**.
2. Custom domain: `seedfreelance.com` (the `static/CNAME` file matches) and
   enable **Enforce HTTPS**. DNS: apex A/ALIAS records to GitHub Pages, or
   follow GitHub's custom-domain guide.

## Screenshots

Portfolio screenshots were captured with headless Chrome at a **1440×900
viewport** and are served through Hugo image processing as WebP srcsets
(400/800/1200 w) with lazy loading. To refresh one, replace the PNG in its
bundle — derivatives regenerate at build time.

## Quality numbers (2026-08-13, local build)

- Lighthouse mobile, EN and FR: **100 / 100 / 100 / 100**
  (performance / accessibility / best practices / SEO); LCP 1.7 s, CLS 0.001
- Total transfer on first load: ~140 KiB before HTTP compression
- JS: ~1 KB gzipped; fonts: 88 KB woff2 (4 latin-subset files, self-hosted)

## Deferred / open items

- **Contact form end-to-end test** — needs the real Web3Forms key
  (create key → add the `WEB3FORMS_KEY` repo secret → submit once from each
  language and confirm receipt in Gmail; first mails may land in spam).
- **Helicon IA testimonial** — the FootCheck card has an empty `testimonial`
  field that renders nothing; paste the quote when it arrives.
- **Gmail-agent demo animation** — the 4.6 MB GIF was replaced by a poster
  frame; a ~400 KB muted MP4 loop is possible if motion is wanted.
- **seedofyoga.com** still shows "Coming soon"; its card links out anyway
  (by choice) — refresh the screenshot when the site goes live.
- **OG image** is a capture of the site's own hero; retake after future
  design changes (`assets/og/og-image.png`, 1200×630).
