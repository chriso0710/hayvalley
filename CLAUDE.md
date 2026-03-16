# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog and portfolio site for Christian Ott (hayvalley.de). Built with Jekyll and a customized Minimal Mistakes theme. Hosted via GitHub Pages from the `master` branch.

## Development Commands

```bash
# Install dependencies
bundle install
npm install

# Local development server (with auto-reload)
bundle exec jekyll serve --livereload

# Build the site
bundle exec jekyll build

# Rake tasks (from the Minimal Mistakes theme tooling)
bundle exec rake          # runs copyright, changelog, js, version
bundle exec rake js       # minify JS with UglifyJS
bundle exec rake watch_js # watch and rebuild JS on changes
```

## Architecture

- **Jekyll static site** with Minimal Mistakes theme (vendored, not via gem/remote_theme)
- **Ruby 3.3.7** with RVM gemset "hayvalley"
- **Content collections:** `_posts/` (blog), `_pages/` (static pages), `_portfolio/` (project showcases)
- **Layouts/Includes:** `_layouts/` and `_includes/` override/extend the Minimal Mistakes theme
- **Styling:** SASS in `_sass/minimal-mistakes/`, compiled with compressed output
- **JavaScript:** Source in `assets/js/`, minified to `assets/js/main.min.js` via UglifyJS. Custom scripts: `biotyped.js` (typed text effect), loaded via `footer_scripts` in `_config.yml`
- **Build output:** `_site/` (gitignored)

## Content Authoring

- Posts go in `_posts/` with filename format `YYYY-MM-DD-title.md`
- Pages go in `_pages/` with front matter specifying permalink
- Portfolio items go in `_portfolio/`
- Markdown processor: Kramdown with GFM input and Rouge syntax highlighting
- Permalink structure: `/:categories/:title/`

## Configuration

- Main config: `_config.yml` (requires server restart on change)
- Navigation: `_data/navigation.yml`
- UI translations: `_data/ui-text.yml`
