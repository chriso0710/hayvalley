# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and one-page site for Christian Ott (hayvalley.de). Built with Jekyll 4.3, plain CSS (no SASS pipeline), Bootstrap 5, and hosted via Netlify (build config in `netlify.toml`). Deployment branch: `master`.

## Development Commands

```bash
# Install dependencies
bundle install

# Local development server (with auto-reload)
bundle exec jekyll serve --livereload

# Production build
bundle exec jekyll build
```

Note: `_config.yml` changes require a server restart.

## Architecture

**Single-page app with i18n:** The site is a single-page layout (not a multi-page Jekyll blog). Both `index.html` (English) and `de/index.html` (German) render the same sequence of section includes with language-specific data.

**Language system:** Each page sets `lang: en` or `lang: de` in front matter. The `_includes/lang.html` helper sets `t` (strings) and `d` (data) variables from `_data/{lang}/`. All includes use these variables for content, so text lives in YAML data files, not in templates.

- `_data/en/` and `_data/de/` — parallel sets of YAML files (about, services, experience, education, skills, stats, portfolio, testimonials, clients, quote, strings, navigation)
- `_data/social.yml` — shared social links

**Layouts:** Only two: `default.html` (main site shell with navbar, content, footer, scripts) and `legal.html` (for legal/privacy pages).

**Includes:** Each section of the one-pager is its own include file in `_includes/` (header, about, quote, resume, services, numbers, clients, portfolio, testimonials, contact, etc.). Blog section is currently commented out in both index files.

**Styling:** Single plain CSS file at `assets/css/style.css` — no SASS compilation. Uses CSS custom properties for theming (dark theme with green accent). Fonts: Josefin Sans (headings) and Open Sans (body) via Google Fonts.

**JavaScript:** `assets/js/main.js` loaded via `_includes/scripts.html` with `defer`. Bootstrap 5 JS loaded from CDN.

**Static pages:** `legal.md`, `privacy.md`, `de/impressum.md`, `de/datenschutz.md` use the `legal` layout.

## Content Editing

To update site content, edit the YAML files in `_data/en/` and `_data/de/`. The includes read from these data files — do not hardcode text in HTML templates. Always update both language versions when changing content.

## Ruby Version

Managed via `.mise.toml` — Ruby 3.4.
