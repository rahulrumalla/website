# Project Context

## Overview

This is the personal portfolio website for Rahul Rumalla, showcasing professional work, talks, and writing in the music and Web3 industries. The site serves as a digital presence with a focus on thought leadership through conference presentations and blog content.

## Purpose

- Professional portfolio and online presence
- Showcase conference talks and presentations
- Link to external blog (Substack)
- Provide contact information and professional background
- Demonstrate expertise in music technology and Web3

## Technology Stack

### Core Framework
- **VitePress** v1.0.0-rc.20 (Vue.js-based static site generator)
- **Vue.js** (via VitePress)
- **Vite** (build tool, via VitePress)

### Development Tools
- **Package Manager**: Yarn v1.22.22
- **Node.js**: 18+ required
- **TypeScript**: Configuration files use .mts extension

### Hosting & Deployment
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions (automatic deployment on push to main)
- **Workflow**: `.github/workflows/deploy.yml`

### Analytics
- **Google Tag Manager**: Integrated via environment variable
- **Configuration**: Set via `GOOGLE_TAG_MANAGER` env var

## Key Architectural Decisions

### Theme Choice
- Uses VitePress default theme **without fonts** (`theme-without-fonts`)
- **Rationale**: Performance optimization, relies on system fonts
- Custom theme extensions in `docs/.vitepress/theme/index.js`

### Blog Strategy
- **Current**: External blog on Substack (https://rahulrumalla.substack.com/)
- **Navigation**: Direct link to external Substack in nav
- **Local placeholder**: `docs/blog/index.md` exists but minimal

### Design System
- **Color Palette**: Warm orange and beige theme
  - Primary brand: #D97A52 (orange)
  - Background (light): #F6F3EA (warm beige)
  - Background (dark): #1e1e20
- **Custom CSS**: All overrides in `docs/.vitepress/theme/custom.css`
- **Images**: Profile images use 5% border-radius with solid borders

### Content Organization
- Flat structure for main pages (index, about, talks)
- Blog as subdirectory (though currently external)
- Public assets in `docs/public/`
- No sidebar or aside navigation on content pages

## Project Structure

```
/Users/rahulrumalla/Github/rahulrumalla/website/
├── .env                          # Local environment variables (not committed)
├── .env.example                  # Environment variable template
├── .gitignore                    # Git ignore rules
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions deployment workflow
├── .claude/                     # AI assistant context and documentation
│   ├── project-context.md       # This file
│   ├── conventions.md           # Coding patterns and standards
│   ├── content-guide.md         # Content management guide
│   ├── common-tasks.md          # Task-specific guides
│   ├── quick-reference.md       # One-page cheat sheet
│   ├── settings.local.json      # Claude permissions and settings
│   └── templates/               # Content templates
├── docs/                        # Source directory for site content
│   ├── index.md                # Homepage (hero layout)
│   ├── about.md                # About/bio page
│   ├── talks.md                # Conference talks with video embeds
│   ├── blog/
│   │   └── index.md           # Blog placeholder (links to Substack)
│   ├── public/                # Static assets
│   │   └── profile.jpg        # Profile picture (104KB JPEG)
│   └── .vitepress/
│       ├── config.mts         # Site configuration
│       ├── cache/             # Build cache (gitignored)
│       ├── dist/              # Build output (gitignored)
│       └── theme/
│           ├── index.js       # Theme customization
│           └── custom.css     # Custom CSS overrides
├── package.json               # Project metadata and scripts
├── yarn.lock                  # Dependency lock file
└── README.md                  # Project documentation
```

## Key File Locations

### Configuration Files
- **VitePress config**: `docs/.vitepress/config.mts`
  - Site title, description
  - Navigation structure
  - Social links
  - Footer content
  - Google Tag Manager integration

- **Theme config**: `docs/.vitepress/theme/index.js`
  - Imports base theme without fonts
  - Imports custom CSS

- **Custom styles**: `docs/.vitepress/theme/custom.css`
  - CSS variable overrides
  - Light/dark mode customization
  - Component-specific styles

### Content Files
- **Homepage**: `docs/index.md` (hero layout with profile, tagline, CTAs)
- **About page**: `docs/about.md` (bio, experience, contact info)
- **Talks page**: `docs/talks.md` (conference presentations with video embeds)
- **Blog placeholder**: `docs/blog/index.md` (minimal, redirects to Substack)

### Assets
- **Profile image**: `docs/public/profile.jpg`
- **Public directory**: `docs/public/` (all files here are served at root `/`)

### Build Output
- **Production build**: `docs/.vitepress/dist/` (gitignored)
- **Build cache**: `docs/.vitepress/cache/` (gitignored)

## Deployment Process

### Local Development
1. Copy `.env.example` to `.env`
2. Add `GOOGLE_TAG_MANAGER` value to `.env`
3. Run `yarn install`
4. Run `yarn docs:dev`
5. Site available at http://localhost:5173

### Production Deployment
1. Push to `main` branch
2. GitHub Actions workflow triggers automatically
3. Workflow builds site with `yarn docs:build`
4. Environment secret `GOOGLE_TAG_MANAGER` injected during build
5. Built site deployed to GitHub Pages
6. Available at configured GitHub Pages URL

### Required Secrets
- **GitHub Repository Secret**: `GOOGLE_TAG_MANAGER`
  - Set in repository settings → Secrets and variables → Actions
  - Used during GitHub Actions build process

## Navigation Structure

Current site navigation:
- **About** → `/about` (internal page)
- **Blog** → https://rahulrumalla.substack.com/ (external link)
- **Talks** → `/talks` (internal page)

Social links (in header):
- GitHub: https://github.com/rahulrumalla
- LinkedIn: https://linkedin.com/in/rahul-rumalla
- Twitter: https://twitter.com/rahulrumalla

Footer:
- Copyright: "© 2025 RSQUARE UG"

## Content Philosophy

- **Minimal but professional**: Clean, focused design
- **External blog**: Leverage Substack for regular writing
- **Video-first talks**: Embed conference presentations directly
- **Contact accessibility**: Clear contact info on about page
- **Anti-spam formatting**: Email written as "me [at] rahulrumalla [dot] com"

## Maintenance Considerations

### Dependencies
- Currently using VitePress RC version (v1.0.0-rc.20)
- Monitor for v1.0.0 stable release
- Update dependencies periodically with `yarn upgrade-interactive`

### Content Updates
- Talks: Add new entries to `docs/talks.md`
- Profile: Update bio in `docs/about.md`
- Homepage: Edit tagline in `docs/index.md` frontmatter
- Blog: Managed externally on Substack

### Performance
- No custom fonts loaded (system fonts only)
- Images should be optimized before adding to `docs/public/`
- VitePress handles most optimization automatically

## Business Context

- **Owner**: Rahul Rumalla
- **Company**: RSQUARE UG
- **Professional Focus**:
  - 2x founder
  - 15+ years experience in engineering and product
  - Web3 and blockchain (Ethereum community member)
  - Music technology and creator economies
- **Target Audience**:
  - Conference organizers
  - Potential collaborators
  - Professional network
  - Web3 and music tech communities
