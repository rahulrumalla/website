# Project Conventions

## File Structure

### Directory Organization

```
docs/
├── *.md                    # Top-level content pages
├── blog/                   # Blog section (currently placeholder)
├── public/                 # Static assets (images, files)
└── .vitepress/
    ├── config.mts         # Site configuration
    ├── cache/             # Build cache (auto-generated)
    ├── dist/              # Build output (auto-generated)
    └── theme/
        ├── index.js       # Theme entry point
        └── custom.css     # Custom styles
```

### File Naming

- **Content pages**: Lowercase with hyphens (e.g., `about.md`, `my-page.md`)
- **Config files**: Use `.mts` extension for TypeScript config
- **Assets**: Descriptive names, lowercase (e.g., `profile.jpg`, `logo.png`)

### Content Organization

- **Top-level pages**: Direct children of `docs/` (index, about, talks)
- **Sections**: Use subdirectories (e.g., `blog/`, future: `projects/`)
- **Assets**: All in `docs/public/`, referenced without `/public` prefix

## Frontmatter Patterns

### Homepage (Hero Layout)

```yaml
---
layout: home

hero:
  name: "Display Name"
  text: "Tagline or Handle"
  tagline: "Longer description of who you are and what you do"
  image: /profile.jpg
  actions:
    - theme: brand
      text: Button Text
      link: /destination
    - theme: alt
      text: Secondary Button
      link: /other-destination
---
```

**Usage**: Only for the main homepage (`index.md`)

### Content Pages (Doc Layout)

```yaml
---
layout: doc
sidebar: false
aside: false
title: Optional Page Title
---

# Page Heading
Content starts here...
```

**Usage**: All standard content pages (about, talks, blog, etc.)

**Why disable sidebar/aside**: This site uses a minimal navigation approach with header nav only

### Blog Pages (if moved to local)

```yaml
---
layout: doc
title: Blog Post Title
sidebar: false
aside: false
date: 2025-01-09
---

# Blog Post Title

Content...
```

**Note**: Currently blog is external (Substack), but this pattern is ready for future use

## Content Conventions

### Profile Images

- **Location**: `docs/public/profile.jpg`
- **Reference in markdown**: `/profile.jpg` (public/ is implied)
- **Recommended size**: ~800x800px for profile shots
- **Format**: JPEG for photos, PNG for graphics
- **Current file**: 104KB JPEG

### Video Embeds

#### YouTube Pattern
```html
<iframe width="560" height="315"
  src="https://www.youtube.com/embed/VIDEO_ID?si=TRACKING_ID&start=START_SECONDS"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>
```

**Key parameters**:
- `VIDEO_ID`: YouTube video ID
- `start=XXX`: Start time in seconds (optional)
- `si=XXX`: YouTube tracking ID (optional, auto-generated)

#### Spotify Embed Pattern
```html
<iframe style="border-radius:12px"
  src="https://open.spotify.com/embed/episode/EPISODE_ID?utm_source=generator"
  width="100%"
  height="352"
  frameBorder="0"
  allowfullscreen=""
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy">
</iframe>
```

**Usage**: For podcast episodes on Spotify

### Contact Information

**Anti-spam email format**: `me [at] rahulrumalla [dot] com`

**Rationale**: Reduces automated email harvesting while remaining human-readable

### Internal Links

- **Format**: Relative paths without `.html` extension
- **Example**: `/about` not `/about.html`
- **Anchors**: `/about#contact` for linking to specific sections
- **External links**: Full URLs with `https://`

### Talks Structure

Each talk entry follows this pattern:

```markdown
## Talk Title - Event Name [Date]

Brief description paragraph explaining the talk content, context,
and any relevant background about why it was presented.

<iframe ...video embed...></iframe>
```

**Chronological order**: Newest talks first (top of page)

## Styling Conventions

### CSS Variables

Defined in `docs/.vitepress/theme/custom.css`:

#### Light Mode (`:root`)
```css
:root {
  --vp-c-bg: #F6F3EA;                    /* Warm beige background */
  --vp-c-bg-soft: #f1ede0;               /* Slightly darker background */
  --vp-c-brand-1: #D97A52;               /* Primary orange */
  --vp-c-brand-2: #E48F5C;               /* Lighter orange */
  --vp-c-brand-3: #E48F5C;               /* Accent orange */
}
```

#### Dark Mode (`.dark`)
```css
.dark {
  --vp-c-bg: #1e1e20;                    /* Dark background */
  --vp-c-bg-soft: #252529;               /* Slightly lighter background */
  /* Brand colors remain same in dark mode */
}
```

### Component Styles

#### Profile Images
```css
.VPImage.image-src {
  border-radius: 5%;                     /* Rounded corners */
  border: 2px solid currentColor;        /* Border uses text color */
}
```

**Applies to**: Any image with VPImage class (like hero profile image)

### Color Palette

- **Primary Brand**: #D97A52 (warm orange)
- **Secondary Brand**: #E48F5C (lighter orange)
- **Light Background**: #F6F3EA (warm beige)
- **Dark Background**: #1e1e20 (near black)

**Design Philosophy**: Warm, professional, with strong brand identity

## Configuration Patterns

### Environment Variables

**File**: `docs/.vitepress/config.mts`

```typescript
const GOOGLE_TAG_MANAGER = process.env.GOOGLE_TAG_MANAGER;
```

**Usage in config**:
```typescript
head: [
  [
    "script",
    {
      async: "",
      src: `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_MANAGER}`,
    },
  ],
  // ... gtag config script
]
```

**Required variables**:
- `GOOGLE_TAG_MANAGER`: GTM ID (e.g., GTM-XXXXXXX)

### Navigation Structure

**File**: `docs/.vitepress/config.mts` → `themeConfig.nav`

```typescript
nav: [
  { text: "About", link: "/about" },
  { text: "Blog", link: "https://rahulrumalla.substack.com/" },
  { text: "Talks", link: "/talks" }
]
```

**Pattern**:
- Internal pages: Relative path with leading slash
- External pages: Full URL with https://

### Social Links

**File**: `docs/.vitepress/config.mts` → `themeConfig.socialLinks`

```typescript
socialLinks: [
  { icon: "github", link: "https://github.com/rahulrumalla" },
  { icon: "linkedin", link: "https://linkedin.com/in/rahul-rumalla" },
  { icon: "twitter", link: "https://twitter.com/rahulrumalla" }
]
```

**Available icons**: github, twitter, linkedin, facebook, instagram, youtube, slack, discord, and more (see VitePress docs)

### Footer Configuration

**File**: `docs/.vitepress/config.mts` → `themeConfig.footer`

```typescript
footer: {
  message: "",                           // Optional message above copyright
  copyright: "© 2025 RSQUARE UG"
}
```

## Script Naming

**File**: `package.json` → `scripts`

```json
{
  "docs:dev": "vitepress dev docs",      // Development server
  "docs:build": "vitepress build docs",  // Production build
  "docs:preview": "vitepress preview docs", // Preview build locally
  "docs:clean": "rm -rf docs/.vitepress/dist docs/.vitepress/cache" // Clean build artifacts
}
```

**Naming convention**: `docs:` prefix for all VitePress commands

## VitePress-Specific Patterns

### Theme Customization

**File**: `docs/.vitepress/theme/index.js`

```javascript
import DefaultTheme from 'vitepress/theme-without-fonts'
import './custom.css'

export default DefaultTheme
```

**Pattern**:
1. Import base theme (without-fonts variant)
2. Import custom CSS
3. Export theme

### Configuration File

**File**: `docs/.vitepress/config.mts` (TypeScript)

```typescript
import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Site Title",
  description: "Site Description",
  // ... configuration
});
```

**Extension**: `.mts` for TypeScript module

### Routing

- **File-based routing**: `docs/page.md` → `/page.html` → accessible as `/page`
- **Index files**: `docs/index.md` → `/` (homepage)
- **Nested**: `docs/blog/post.md` → `/blog/post`

## Git Conventions

### Commit Messages

Recent commits show this pattern:
- `ci: updates version of actions` (CI/CD changes)
- `feat: adds google tag manager` (new features)
- `fix: adds quotes around tag manager` (bug fixes)

**Convention**: Conventional commits style (type: description)

### Branching

- **Main branch**: `main` (protected, auto-deploys)
- **Feature branches**: Create for significant changes, merge to main

### What's Ignored

From `.gitignore`:
- `node_modules/`
- `.env` (but `.env.example` is tracked)
- `docs/.vitepress/dist/` (build output)
- `docs/.vitepress/cache/` (build cache)
- `.DS_Store` (macOS)
- Log files (`*.log`)

## Best Practices

### Content
- Keep pages concise and scannable
- Use descriptive headings (H2, H3)
- Include context for embedded videos
- Update copyright year in footer annually

### Assets
- Optimize images before adding (compress JPEGs, minify PNGs)
- Use descriptive file names
- Keep public/ directory organized

### Development
- Test locally before pushing (`yarn docs:dev`)
- Clear cache if build issues occur (`yarn docs:clean`)
- Check that GOOGLE_TAG_MANAGER env var is set

### Deployment
- Push to main triggers automatic deployment
- Check GitHub Actions tab for deployment status
- Deployment typically takes 2-3 minutes

### Maintenance
- Review and update dependencies periodically
- Monitor for VitePress 1.0.0 stable release
- Keep content fresh (add new talks, update bio)
