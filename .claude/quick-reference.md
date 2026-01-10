# Quick Reference

One-page cheat sheet for your VitePress website.

## File Locations

```
docs/
├── index.md                          # Homepage
├── about.md                          # About page
├── talks.md                          # Talks page
├── blog/index.md                     # Blog placeholder
├── public/                           # Static assets
│   └── profile.jpg                   # Profile photo
└── .vitepress/
    ├── config.mts                    # Site config
    └── theme/
        ├── index.js                  # Theme entry
        └── custom.css                # Custom styles

.env                                  # Local env vars (not committed)
.env.example                          # Env template
package.json                          # Scripts & dependencies
.github/workflows/deploy.yml          # GitHub Actions workflow
```

## Commands

```bash
# Development
yarn docs:dev                          # Start dev server (http://localhost:5173)
yarn docs:build                        # Build for production
yarn docs:preview                      # Preview production build
yarn docs:clean                        # Clean build cache

# Setup
cp .env.example .env                   # Copy environment template
yarn install                           # Install dependencies

# Git
git status                             # Check what changed
git add .                              # Stage all changes
git commit -m "message"                # Commit changes
git push origin main                   # Push & deploy
```

## Common Edits

| What to Change | File to Edit | Line |
|---------------|--------------|------|
| Homepage tagline | `docs/index.md` | 8 |
| About bio | `docs/about.md` | 9 |
| Add nav item | `docs/.vitepress/config.mts` | 28 |
| Add social link | `docs/.vitepress/config.mts` | 40 |
| Change colors | `docs/.vitepress/theme/custom.css` | 5-13 |
| Update footer | `docs/.vitepress/config.mts` | 46 |
| Add talk | `docs/talks.md` | Top |
| Profile picture | `docs/public/profile.jpg` | - |

## Frontmatter Templates

### Home Page (Hero Layout)
```yaml
---
layout: home

hero:
  name: "Your Name"
  text: "Tagline"
  tagline: "Longer description here"
  image: /profile.jpg
  actions:
    - theme: brand
      text: Button Text
      link: /destination
    - theme: alt
      text: Secondary Button
      link: /other-page
---
```

### Content Page (Doc Layout)
```yaml
---
layout: doc
sidebar: false
aside: false
title: Optional Page Title
---

# Page Heading
Content here...
```

### Talk Entry
```markdown
## Talk Title - Event Name [Date]

Description of the talk and context.

<iframe width="560" height="315"
  src="https://www.youtube.com/embed/VIDEO_ID?start=0"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>
```

## Color Palette

| Color | Hex | Used For |
|-------|-----|----------|
| Primary Orange | `#D97A52` | Links, buttons, brand |
| Secondary Orange | `#E48F5C` | Hover states |
| Light Background | `#F6F3EA` | Page background |
| Dark Background | `#1e1e20` | Dark mode background |

**Edit colors**: `docs/.vitepress/theme/custom.css`

## Environment Variables

| Variable | Where to Set | Purpose |
|----------|-------------|---------|
| `GOOGLE_TAG_MANAGER` | `.env` (local) | Analytics during dev |
| `GOOGLE_TAG_MANAGER` | GitHub Secrets | Analytics on production |

**Local setup**:
```bash
cp .env.example .env
# Edit .env, add: GOOGLE_TAG_MANAGER=GTM-XXXXXXX
```

**GitHub setup**:
1. Go to repo Settings → Secrets and variables → Actions
2. New secret: `GOOGLE_TAG_MANAGER` = `GTM-XXXXXXX`

## Navigation Structure

**Current nav** (in `config.mts`):
```typescript
nav: [
  { text: "About", link: "/about" },
  { text: "Blog", link: "https://rahulrumalla.substack.com/" },
  { text: "Talks", link: "/talks" }
]
```

**Add item**:
```typescript
{ text: "New Page", link: "/new-page" }
```

**Dropdown menu**:
```typescript
{
  text: "More",
  items: [
    { text: "Item 1", link: "/item-1" },
    { text: "Item 2", link: "/item-2" }
  ]
}
```

## Social Links

**Current** (in `config.mts`):
```typescript
socialLinks: [
  { icon: "github", link: "https://github.com/rahulrumalla" },
  { icon: "linkedin", link: "https://linkedin.com/in/rahul-rumalla" },
  { icon: "twitter", link: "https://twitter.com/rahulrumalla" }
]
```

**Available icons**: github, twitter, linkedin, facebook, instagram, youtube, slack, discord, mastodon

## Image Usage

**Add image**:
1. Put in `docs/public/` (e.g., `docs/public/my-image.jpg`)
2. Reference in markdown: `![Alt](/my-image.jpg)`
3. Note: Don't include `/public` in path!

**Profile picture**:
- Location: `docs/public/profile.jpg`
- Recommended: 800x800px, < 200KB
- Just replace file, keep same name

## CSS Variables

**Edit**: `docs/.vitepress/theme/custom.css`

```css
:root {
  --vp-c-bg: #F6F3EA;              /* Background */
  --vp-c-brand-1: #D97A52;         /* Primary color */
  --vp-c-brand-2: #E48F5C;         /* Secondary color */
}

.dark {
  --vp-c-bg: #1e1e20;              /* Dark background */
}
```

## Deployment

**Automatic**: Push to `main` branch → GitHub Actions deploys

**Manual check**:
```bash
yarn docs:build                   # Test build locally
yarn docs:preview                 # Preview build
git push origin main              # Deploy
```

**Check status**: https://github.com/rahulrumalla/website/actions

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Dev server won't start | Check Node version (need 18+), run `yarn install` |
| Build fails | Check `GOOGLE_TAG_MANAGER` in `.env`, run `yarn docs:clean` |
| Images not showing | Verify in `docs/public/`, path should be `/image.jpg` not `/public/image.jpg` |
| Styles not updating | Hard refresh (Cmd+Shift+R or Ctrl+Shift+R), clear cache |
| Deploy failing | Check GitHub Actions tab, verify secrets are set |

## Links

- **VitePress Docs**: https://vitepress.dev
- **Live Site**: [Your GitHub Pages URL]
- **Blog**: https://rahulrumalla.substack.com/
- **GitHub Repo**: https://github.com/rahulrumalla/website
- **Project Docs**: `.claude/` directory

## Project Info

- **Framework**: VitePress v1.0.0-rc.20
- **Package Manager**: Yarn v1.22.22
- **Node Version**: 18+
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Theme**: Default (without fonts) + custom CSS

## File Routing

| File | URL |
|------|-----|
| `docs/index.md` | `/` |
| `docs/about.md` | `/about` |
| `docs/talks.md` | `/talks` |
| `docs/blog/index.md` | `/blog/` |
| `docs/page.md` | `/page` |
| `docs/section/page.md` | `/section/page` |

## Templates

Located in `.claude/templates/`:
- `page-template.md` - Standard page template
- `talk-template.md` - Talk entry template

**Use**:
```bash
cp .claude/templates/page-template.md docs/new-page.md
```

## Quick Tasks

**Add page**:
```bash
touch docs/new-page.md
# Add frontmatter, content, optionally add to nav
```

**Add talk**:
```bash
# Edit docs/talks.md, add entry at top
```

**Change color**:
```bash
# Edit docs/.vitepress/theme/custom.css
```

**Update profile**:
```bash
cp new-photo.jpg docs/public/profile.jpg
```

**Deploy**:
```bash
git add . && git commit -m "Update" && git push origin main
```

---

**For detailed guides**: See `.claude/content-guide.md` and `.claude/common-tasks.md`
