# Content Management Guide

Complete guide for managing content on your VitePress personal website.

## Table of Contents

1. [VitePress Fundamentals](#vitepress-fundamentals)
2. [Adding New Pages](#adding-new-pages)
3. [Managing Talks](#managing-talks)
4. [Blog Management](#blog-management)
5. [Image Management](#image-management)
6. [Customizing Theme](#customizing-theme)
7. [Navigation & Links](#navigation--links)
8. [Environment Configuration](#environment-configuration)

---

## VitePress Fundamentals

### Page Types

VitePress supports multiple layout types. This site uses two:

**1. Home Layout** (Hero page)

- Used for: Homepage only
- Features: Large hero section with image, name, tagline, and action buttons
- File: `docs/index.md`

**2. Doc Layout** (Content pages)

- Used for: All other pages (about, talks, blog)
- Features: Clean content-focused layout
- Configuration: Sidebar and aside disabled for minimal design

### Frontmatter Options

Every markdown file starts with YAML frontmatter between `---` markers:

```yaml
---
layout: doc # Layout type: home | doc
sidebar: false # Show/hide sidebar (we use false)
aside: false # Show/hide table of contents (we use false)
title: Page Title # Optional: Browser tab title
---
```

### Markdown Extensions

VitePress supports:

- **Standard markdown**: Headings, lists, links, images
- **GitHub-flavored markdown**: Tables, task lists, strikethrough
- **Custom containers**: :::tip, :::warning, :::danger
- **Code blocks**: With syntax highlighting
- **HTML**: Can embed raw HTML (used for video iframes)

### File-Based Routing

Files automatically become pages:

- `docs/index.md` → `/` (homepage)
- `docs/about.md` → `/about`
- `docs/talks.md` → `/talks`
- `docs/blog/index.md` → `/blog/`
- `docs/blog/post.md` → `/blog/post`

---

## Adding New Pages

### Step 1: Create Markdown File

Create a new `.md` file in the `docs/` directory:

```bash
# For a top-level page
touch docs/new-page.md

# For a page in a section
mkdir -p docs/section-name
touch docs/section-name/page-name.md
```

### Step 2: Add Frontmatter and Content

Edit the file and add frontmatter:

```markdown
---
layout: doc
sidebar: false
aside: false
title: Optional Custom Title
---

# Page Heading

Your content goes here. Use markdown formatting:

## Section Heading

Paragraph text with **bold** and _italic_ formatting.

### Subsection

- Bullet point 1
- Bullet point 2
- Bullet point 3

[Link to another page](/about)
```

### Step 3: Add to Navigation (Optional)

If you want the page in the header navigation:

1. Edit `docs/.vitepress/config.mts`
2. Find the `nav` array under `themeConfig`
3. Add your page:

```typescript
nav: [
  { text: "About", link: "/about" },
  { text: "Blog", link: "https://rahulrumalla.substack.com/" },
  { text: "Talks", link: "/talks" },
  { text: "New Page", link: "/new-page" }, // Add this
];
```

### Step 4: Test Locally

```bash
yarn docs:dev
```

Visit http://localhost:5173/new-page to preview.

### Example: Adding a Projects Page

```markdown
---
layout: doc
sidebar: false
aside: false
---

# Projects

Here are some projects I've worked on over the years.

## Project Name

Description of the project, technologies used, and outcomes.

**Technologies**: React, TypeScript, Node.js

**Links**: [GitHub](https://github.com/...) | [Live Demo](https://...)

## Another Project

More details...
```

---

## Managing Talks

Talks are all managed in a single file: `docs/talks.md`

### Current Structure

```markdown
---
layout: doc
sidebar: false
aside: false
---

# Talks

Intro paragraph about your speaking engagements...

## Talk Title - Event Name [Date]

Description paragraph about the talk...

<iframe>video embed...</iframe>

## Another Talk - Event [Date]

Description...

<iframe>video embed...</iframe>
```

### Adding a New Talk

#### 1. Get Video Embed Code

**For YouTube**:

1. Go to the video on YouTube
2. Click "Share" → "Embed"
3. Copy the iframe code
4. Add `&start=XXX` to URL to start at specific second (optional)

**For Spotify**:

1. Open episode on Spotify
2. Click "..." → "Share" → "Embed episode"
3. Copy the iframe code

#### 2. Add Entry to talks.md

Edit `docs/talks.md` and add at the top (newest first):

```markdown
## Your Talk Title - Conference Name [Date]

Brief description of the talk content. Explain what you covered,
why it was important, and any relevant context about the event or
your experience giving the talk.

<iframe width="560" height="315"
  src="https://www.youtube.com/embed/VIDEO_ID?start=0"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>
```

#### 3. Example with Real Data

```markdown
## Building Decentralized Apps - Ethereum Denver [Mar 15, 2025]

In this talk, I explored the fundamentals of building production-ready
decentralized applications on Ethereum. I covered smart contract design
patterns, security considerations, and how to create user-friendly dApps
that bridge the gap between Web2 and Web3.

<iframe width="560" height="315"
  src="https://www.youtube.com/embed/dQw4w9WgXcQ?start=120"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>
```

#### 4. Tips for Talk Entries

- **Order**: Newest talks first (top of page)
- **Date format**: [Month Day, Year] or [Date]
- **Description**: 2-4 sentences, include context and key topics
- **Start time**: Use `?start=XXX` to skip intros (seconds)
- **Video quality**: YouTube embeds at 560x315 by default

---

## Blog Management

### Current Setup: External Substack

Your blog currently lives on Substack: https://rahulrumalla.substack.com/

The navigation links to it externally, and `docs/blog/index.md` is just a placeholder.

### Option 1: Keep Substack (Current)

No changes needed. Continue publishing on Substack.

To update the link:

1. Edit `docs/.vitepress/config.mts`
2. Update the URL in the nav array:

```typescript
nav: [{ text: "Blog", link: "https://your-new-blog-url.com/" }];
```

### Option 2: Move to Local Blog

To migrate blog to local VitePress:

#### 1. Update Navigation

In `docs/.vitepress/config.mts`:

```typescript
nav: [
  { text: "Blog", link: "/blog/" }, // Changed from external URL
];
```

#### 2. Create Blog Index

Update `docs/blog/index.md`:

```markdown
---
layout: doc
sidebar: false
aside: false
---

# Blog

I write about product, engineering, music, and web3.

## Recent Posts

- [Post Title 1](/blog/post-1) - January 9, 2025
- [Post Title 2](/blog/post-2) - December 15, 2024
- [Post Title 3](/blog/post-3) - November 3, 2024
```

#### 3. Create Blog Posts

```markdown
---
layout: doc
sidebar: false
aside: false
title: Post Title
date: 2025-01-09
---

# Post Title

Published: January 9, 2025

Your blog post content here...

## Section

More content...
```

Save as `docs/blog/post-slug.md`

### Option 3: Hybrid Approach

Keep Substack as primary, but mirror select posts locally:

- Main blog remains on Substack (nav links there)
- Create `docs/featured/` directory for select posts
- Add "Featured Writing" page to showcase best content

---

## Image Management

### Public Directory

All static assets go in `docs/public/`:

```
docs/public/
├── profile.jpg           # Your profile photo
├── logo.png             # Site logo (if added)
└── talks/               # Organize by section
    ├── devcon-2022.jpg
    └── tedemo-2025.png
```

### Adding Images

#### 1. Add File to Public

```bash
cp ~/Downloads/my-image.jpg docs/public/my-image.jpg
```

#### 2. Reference in Markdown

Images in `public/` are served from root `/`:

```markdown
![Alt text](/my-image.jpg)
```

**Note**: Don't include `/public` in the path!

### Profile Picture

**Location**: `docs/public/profile.jpg`

**Used in**: Homepage hero (configured in `docs/index.md` frontmatter)

**To update**:

1. Optimize your image (recommended: ~800x800px, under 200KB)
2. Replace `docs/public/profile.jpg`
3. Keep filename same, or update frontmatter:

```yaml
hero:
  image: /new-profile.jpg # If you renamed it
```

### Image Best Practices

- **Format**:
  - JPEG for photos
  - PNG for graphics with transparency
  - WebP for modern browsers (VitePress can handle)
- **Size**: Optimize before adding
  - Profile: ~800x800px
  - Content images: Max 1920px width
- **Compression**: Use tools like ImageOptim, TinyPNG
- **Naming**: Descriptive, lowercase, hyphens (e.g., `conference-stage-2024.jpg`)

---

## Customizing Theme

### Changing Colors

Edit `docs/.vitepress/theme/custom.css`:

#### Light Mode Colors

```css
:root {
  --vp-c-bg: #f6f3ea; /* Page background */
  --vp-c-bg-soft: #f1ede0; /* Soft background */
  --vp-c-brand-1: #d97a52; /* Primary brand color */
  --vp-c-brand-2: #e48f5c; /* Secondary brand */
  --vp-c-brand-3: #e48f5c; /* Tertiary brand */
}
```

#### Dark Mode Colors

```css
.dark {
  --vp-c-bg: #1e1e20; /* Dark background */
  --vp-c-bg-soft: #252529; /* Soft dark background */
  /* Brand colors typically same in dark mode */
}
```

### What Colors Control

- `--vp-c-brand-1`: Links, buttons, active nav items
- `--vp-c-brand-2`: Hover states
- `--vp-c-brand-3`: Pressed/active states
- `--vp-c-bg`: Main background color
- `--vp-c-bg-soft`: Alternate background (code blocks, etc.)

### Adding Custom CSS

Add any custom styles to `custom.css`:

```css
/* Example: Style all headings */
h1,
h2,
h3 {
  color: var(--vp-c-brand-1);
}

/* Example: Custom class */
.my-custom-class {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
}
```

### Testing Theme Changes

```bash
yarn docs:dev
```

Changes hot-reload automatically.

---

## Navigation & Links

### Header Navigation

Edit `docs/.vitepress/config.mts` → `themeConfig.nav`:

```typescript
nav: [
  { text: "About", link: "/about" },
  { text: "Blog", link: "https://external-blog.com/" },
  {
    text: "More",
    items: [
      // Dropdown menu
      { text: "Talks", link: "/talks" },
      { text: "Projects", link: "/projects" },
    ],
  },
];
```

### Social Links

Edit `docs/.vitepress/config.mts` → `themeConfig.socialLinks`:

```typescript
socialLinks: [
  { icon: "github", link: "https://github.com/username" },
  { icon: "linkedin", link: "https://linkedin.com/in/username" },
  { icon: "twitter", link: "https://twitter.com/username" },
  { icon: "mastodon", link: "https://mastodon.social/@username" },
];
```

**Available icons**: github, twitter, linkedin, facebook, instagram, youtube, slack, discord, mastodon, and custom SVG icons.

### Footer

Edit `docs/.vitepress/config.mts` → `themeConfig.footer`:

```typescript
footer: {
  message: "Optional message text above copyright",
  copyright: "© 2025 RSQUARE UG"
}
```

### Internal Links in Content

```markdown
[Link text](/about) <!-- Absolute path -->
[Link with anchor](/about#contact) <!-- Link to section -->
[Link text](./relative.md) <!-- Relative path -->
```

### External Links

```markdown
[External link](https://example.com/)
```

External links automatically open in new tab.

---

## Environment Configuration

### Local Development

#### 1. Copy Example File

```bash
cp .env.example .env
```

#### 2. Add Values

Edit `.env`:

```
GOOGLE_TAG_MANAGER=GTM-XXXXXXX
```

Replace `GTM-XXXXXXX` with your actual Google Tag Manager ID.

#### 3. Restart Dev Server

```bash
yarn docs:dev
```

Environment variables are loaded when VitePress starts.

### Production (GitHub Actions)

#### 1. Add Repository Secret

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `GOOGLE_TAG_MANAGER`
5. Value: Your GTM ID
6. Click "Add secret"

#### 2. Verify Workflow

Check `.github/workflows/deploy.yml` includes:

```yaml
env:
  GOOGLE_TAG_MANAGER: ${{ secrets.GOOGLE_TAG_MANAGER }}
```

### Using Environment Variables

In `docs/.vitepress/config.mts`:

```typescript
const MY_VAR = process.env.MY_VAR;

export default defineConfig({
  // Use MY_VAR in configuration
});
```

**Important**: Environment variables are only available during build, not at runtime in the browser.

---

## Quick Examples

### Example 1: Add a Contact Form Page

```markdown
---
layout: doc
sidebar: false
aside: false
---

# Contact

Get in touch with me for speaking opportunities, collaborations, or just to say hello.

## Email

me [at] rahulrumalla [dot] com

## Social Media

Find me on [Twitter](https://twitter.com/rahulrumalla),
[LinkedIn](https://linkedin.com/in/rahul-rumalla), or
[GitHub](https://github.com/rahulrumalla).
```

### Example 2: Add a Resources Page

```markdown
---
layout: doc
sidebar: false
aside: false
---

# Resources

Useful tools, articles, and references in Web3 and music tech.

## Web3 Development

- [Ethereum Documentation](https://ethereum.org/developers)
- [Solidity by Example](https://solidity-by-example.org/)

## Music Technology

- [Spotify for Developers](https://developer.spotify.com/)
- [Music Encoding Initiative](https://music-encoding.org/)
```

### Example 3: Update Homepage Tagline

Edit `docs/index.md`:

```yaml
---
layout: home

hero:
  name: "Rahul Rumalla"
  text: "@rsquare"
  tagline: "Your new tagline here. Update this text to change what appears below your name on the homepage."
  image: /profile.jpg
  actions:
    - theme: brand
      text: Get in touch
      link: /about#contact
---
```

---

## Troubleshooting

### Build Fails

1. **Check environment variables**: Ensure `GOOGLE_TAG_MANAGER` is set
2. **Clear cache**: Run `yarn docs:clean && yarn docs:build`
3. **Check syntax**: Validate YAML frontmatter and TypeScript config

### Images Not Showing

1. **Verify path**: Images in `docs/public/` use `/filename.jpg` not `/public/filename.jpg`
2. **Check file exists**: Confirm file is actually in `docs/public/`
3. **Case sensitivity**: Filenames are case-sensitive on build servers

### Videos Not Embedding

1. **Use raw HTML**: VitePress requires `<iframe>` tags, not markdown
2. **Check URL**: Ensure embed URL (not watch URL)
3. **Test locally**: Verify iframe renders in dev mode

### Styling Not Applied

1. **Check CSS syntax**: Validate custom.css
2. **Use CSS variables**: Prefer modifying variables over adding rules
3. **Clear cache**: Browser cache might show old styles

---

## Next Steps

- Review [conventions.md](./conventions.md) for detailed patterns
- Check [common-tasks.md](./common-tasks.md) for step-by-step guides
- Use [templates](./templates/) for quick content creation
- See [quick-reference.md](./quick-reference.md) for one-page cheat sheet
