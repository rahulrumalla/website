# Common Tasks

Step-by-step guides for frequent operations on your VitePress website.

## Development Workflow

### Initial Setup

```bash
# 1. Clone repository (if not already done)
git clone git@github.com:rahulrumalla/website.git
cd website

# 2. Copy environment variables
cp .env.example .env

# 3. Edit .env and add your Google Tag Manager ID
# Open .env in your editor and set:
# GOOGLE_TAG_MANAGER=GTM-XXXXXXX

# 4. Install dependencies
yarn install

# 5. Start development server
yarn docs:dev
```

Visit http://localhost:5173 to see your site.

### Daily Development

```bash
# Start dev server
yarn docs:dev

# Build for production (test before deploying)
yarn docs:build

# Preview production build locally
yarn docs:preview

# Clean build artifacts (if having issues)
yarn docs:clean
```

### Stopping Development Server

Press `Ctrl+C` in the terminal running `yarn docs:dev`

---

## Content Management

### Add a New Page

```bash
# 1. Create the markdown file
touch docs/new-page.md

# 2. Edit docs/new-page.md
---
layout: doc
sidebar: false
aside: false
---

# Page Title

Your content here...

# 3. (Optional) Add to navigation
# Edit docs/.vitepress/config.mts and add to nav array:
{ text: "New Page", link: "/new-page" }

# 4. Test locally
yarn docs:dev
# Visit http://localhost:5173/new-page
```

### Add a New Talk

```bash
# 1. Open docs/talks.md in your editor

# 2. Add new entry at the top (newest first):
## Talk Title - Event Name [Date]

Brief description of what you talked about and why it was important.

<iframe width="560" height="315"
  src="https://www.youtube.com/embed/VIDEO_ID?start=0"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>

# 3. Get the VIDEO_ID from your YouTube URL
# Example: https://www.youtube.com/watch?v=VIDEO_ID → use VIDEO_ID

# 4. (Optional) Add start time to skip intro
# Add ?start=120 to start at 2 minutes (120 seconds)

# 5. Test locally
yarn docs:dev
```

### Update Profile Picture

```bash
# 1. Prepare your image
# - Recommended size: 800x800px
# - Format: JPEG or PNG
# - File size: < 200KB (optimize if needed)

# 2. Replace the existing profile.jpg
cp ~/path/to/your/new-photo.jpg docs/public/profile.jpg

# 3. Test locally
yarn docs:dev
# Check homepage for updated image
```

### Update About Page Bio

```bash
# 1. Edit docs/about.md

# 2. Update the bio text (paragraph starting at line 9)

# 3. Update contact email if needed (line 14)

# 4. Test locally
yarn docs:dev
```

### Change Homepage Tagline

```bash
# 1. Edit docs/index.md

# 2. Update the tagline in frontmatter (line 8):
---
hero:
  tagline: "Your new tagline here"
---

# 3. Test locally
yarn docs:dev
```

---

## Theme Customization

### Change Brand Colors

```bash
# 1. Edit docs/.vitepress/theme/custom.css

# 2. Update color values in :root section
:root {
  --vp-c-brand-1: #D97A52;   /* Change primary color */
  --vp-c-brand-2: #E48F5C;   /* Change secondary color */
  --vp-c-bg: #F6F3EA;        /* Change background */
}

# 3. Save and check in browser (hot-reloads automatically)
```

### Change Dark Mode Colors

```bash
# 1. Edit docs/.vitepress/theme/custom.css

# 2. Update .dark section
.dark {
  --vp-c-bg: #1e1e20;         /* Change dark background */
  --vp-c-bg-soft: #252529;    /* Change soft dark bg */
}

# 3. Test by toggling dark mode in browser
```

### Add Custom CSS Styles

```bash
# 1. Edit docs/.vitepress/theme/custom.css

# 2. Add your custom styles at the end:
/* Custom styles */
.my-class {
  color: red;
}

# 3. Use in markdown with HTML:
<div class="my-class">Styled content</div>
```

---

## Navigation & Configuration

### Add Navigation Link

```bash
# 1. Edit docs/.vitepress/config.mts

# 2. Find the nav array (around line 28)

# 3. Add new item:
nav: [
  { text: "About", link: "/about" },
  { text: "Blog", link: "https://rahulrumalla.substack.com/" },
  { text: "Talks", link: "/talks" },
  { text: "New Link", link: "/new-page" },  // Add here
]

# 4. Test locally
yarn docs:dev
```

### Add Social Link

```bash
# 1. Edit docs/.vitepress/config.mts

# 2. Find socialLinks array (around line 40)

# 3. Add new social link:
socialLinks: [
  { icon: "github", link: "https://github.com/rahulrumalla" },
  { icon: "linkedin", link: "https://linkedin.com/in/rahul-rumalla" },
  { icon: "twitter", link: "https://twitter.com/rahulrumalla" },
  { icon: "mastodon", link: "https://mastodon.social/@username" },  // Add here
]

# Available icons: github, twitter, linkedin, facebook, instagram, youtube, slack, discord
```

### Update Footer

```bash
# 1. Edit docs/.vitepress/config.mts

# 2. Find footer object (around line 46)

# 3. Update copyright:
footer: {
  message: "Optional message",
  copyright: "© 2025 RSQUARE UG"
}

# Update year annually
```

---

## Deployment

### Deploy to GitHub Pages

```bash
# Deployment is automatic via GitHub Actions

# 1. Make your changes locally

# 2. Test the build locally
yarn docs:build
yarn docs:preview

# 3. Commit changes
git add .
git commit -m "Your commit message"

# 4. Push to main branch
git push origin main

# 5. Check deployment status
# Go to: https://github.com/rahulrumalla/website/actions
# Watch the "Deploy" workflow
# Deployment takes 2-3 minutes
```

### Manual Build Test

```bash
# Test production build before pushing
yarn docs:build

# If successful, you'll see:
# ✓ built in XXXms

# If it fails, check:
# - GOOGLE_TAG_MANAGER env var is set in .env
# - No syntax errors in markdown or config files
# - Run yarn docs:clean and try again
```

### Set Up GitHub Secret

```bash
# Required one-time setup for production deployments

# 1. Go to GitHub repository
https://github.com/rahulrumalla/website

# 2. Navigate to Settings → Secrets and variables → Actions

# 3. Click "New repository secret"

# 4. Add secret:
# Name: GOOGLE_TAG_MANAGER
# Value: GTM-XXXXXXX (your actual GTM ID)

# 5. Click "Add secret"

# Done! Future deployments will use this secret
```

---

## Maintenance

### Update Dependencies

```bash
# Check for outdated dependencies
yarn outdated

# Update all dependencies (interactive)
yarn upgrade-interactive

# Or update specific package
yarn upgrade vitepress --latest

# Test after updating
yarn docs:dev
yarn docs:build
```

### Clean Build Cache

```bash
# If experiencing build issues or stale content:
yarn docs:clean

# This removes:
# - docs/.vitepress/dist/
# - docs/.vitepress/cache/

# Then rebuild:
yarn docs:build
```

### Check Git Status

```bash
# See what files have changed
git status

# See detailed changes
git diff

# See recent commits
git log --oneline -10
```

---

## Troubleshooting

### Development Server Won't Start

```bash
# 1. Check Node version (need 18+)
node --version

# 2. Reinstall dependencies
rm -rf node_modules
yarn install

# 3. Try starting again
yarn docs:dev
```

### Build Fails with Environment Variable Error

```bash
# 1. Check .env file exists
ls -la .env

# 2. Check it contains GOOGLE_TAG_MANAGER
cat .env

# 3. If missing, copy from example
cp .env.example .env

# 4. Edit .env and add your GTM ID
# Then try building again
yarn docs:build
```

### Images Not Showing

```bash
# 1. Verify image is in docs/public/
ls docs/public/

# 2. Check markdown path (should NOT include /public)
# Correct: ![Image](/image.jpg)
# Wrong: ![Image](/public/image.jpg)

# 3. Clear cache and rebuild
yarn docs:clean
yarn docs:dev
```

### Styles Not Updating

```bash
# 1. Hard refresh browser
# Mac: Cmd+Shift+R
# Windows/Linux: Ctrl+Shift+R

# 2. Clear VitePress cache
yarn docs:clean
yarn docs:dev

# 3. Check for CSS syntax errors in custom.css
```

### Deployment Failing on GitHub

```bash
# 1. Check Actions tab for error message
# https://github.com/rahulrumalla/website/actions

# 2. Common issues:
# - Missing GOOGLE_TAG_MANAGER secret
# - Syntax error in markdown or config
# - Failed build (test locally first)

# 3. Test build locally
yarn docs:build

# 4. If local build works, check GitHub secrets are set
```

### Git Push Rejected

```bash
# If push rejected, pull latest changes first
git pull origin main

# Resolve any conflicts, then push
git push origin main

# Or rebase if you prefer
git pull --rebase origin main
git push origin main
```

---

## Quick Commands Reference

```bash
# Development
yarn docs:dev              # Start dev server
yarn docs:build            # Build for production
yarn docs:preview          # Preview prod build
yarn docs:clean            # Clean cache

# Git
git status                 # Check status
git add .                  # Stage all changes
git commit -m "message"    # Commit with message
git push origin main       # Push to GitHub

# Dependencies
yarn install               # Install deps
yarn outdated              # Check for updates
yarn upgrade-interactive   # Update deps

# File operations
cp .env.example .env       # Copy env file
touch docs/new-page.md     # Create new file
ls docs/public/            # List public files
```

---

## Getting Help

### Documentation Resources

- **VitePress Official**: https://vitepress.dev
- **This project's docs**: `.claude/` directory
- **Quick reference**: `.claude/quick-reference.md`
- **Content guide**: `.claude/content-guide.md`
- **Conventions**: `.claude/conventions.md`

### Common Questions

**Q: How do I add a new page?**
A: See "Add a New Page" section above

**Q: How do I change colors?**
A: Edit `docs/.vitepress/theme/custom.css`

**Q: Where do images go?**
A: In `docs/public/` directory

**Q: How do I deploy?**
A: Just push to main branch, GitHub Actions handles it

**Q: Build failed, what do I do?**
A: Check env vars, run `yarn docs:clean`, try again

---

## Templates

Pre-made templates are available in `.claude/templates/`:
- `page-template.md` - Standard page template
- `talk-template.md` - Talk entry template

```bash
# Use a template
cp .claude/templates/page-template.md docs/new-page.md
# Edit docs/new-page.md with your content
```
