# Rahul Rumalla - Personal Website

Personal portfolio website showcasing talks, blog, and professional background in music and Web3 industries.

Built with [VitePress](https://vitepress.dev) and deployed to GitHub Pages.

## Quick Start

```bash
# 1. Setup environment
cp .env.example .env
# Edit .env and add your GOOGLE_TAG_MANAGER value

# 2. Install dependencies
yarn

# 3. Start development server
yarn docs:dev
```

Visit http://localhost:5173

## Commands

```bash
yarn docs:dev      # Start dev server with hot reload
yarn docs:build    # Build for production
yarn docs:preview  # Preview production build locally
yarn docs:clean    # Clean build cache
```

## Project Structure

```
docs/
├── index.md              # Homepage (hero layout)
├── about.md              # About/bio page
├── talks.md              # Conference talks with videos
├── blog/                 # Blog placeholder (links to Substack)
├── public/               # Static assets
│   └── profile.jpg
└── .vitepress/
    ├── config.mts        # Site configuration
    └── theme/
        ├── index.js      # Theme setup
        └── custom.css    # Custom styling
```

## Deployment

Automatic deployment to GitHub Pages via GitHub Actions on push to `main` branch.

**Required GitHub Secret:** `GOOGLE_TAG_MANAGER`

See [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) for details.

## Tech Stack

- **Framework:** VitePress v1.0.0-rc.20
- **Package Manager:** Yarn v1.22.22
- **Node Version:** 18+
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions
- **Analytics:** Google Tag Manager

## License

© 2025 Rahul Rumalla · RSQUARE UG
