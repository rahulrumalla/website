<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])
const loading = ref(true)
const error = ref(null)

// Parse RSS XML using DOMParser
function parseRSSFeed(xmlText) {
  const parser = new DOMParser()
  const xml = parser.parseFromString(xmlText, 'text/xml')

  const items = xml.querySelectorAll('item')

  return Array.from(items).slice(0, 10).map(item => {
    const title = item.querySelector('title')?.textContent || ''
    const link = item.querySelector('link')?.textContent || ''
    const pubDate = item.querySelector('pubDate')?.textContent || ''
    const description = item.querySelector('description')?.textContent || ''

    // Extract text excerpt (remove HTML tags)
    const excerpt = description.replace(/<[^>]*>/g, '').substring(0, 200) + '...'

    return {
      title,
      link,
      pubDate,
      isoDate: new Date(pubDate).toISOString(),
      excerpt
    }
  })
}

onMounted(async () => {
  try {
    const proxyUrl = 'https://api.allorigins.win/raw?url='
    const rssUrl = encodeURIComponent('https://rahulrumalla.substack.com/feed')
    const response = await fetch(proxyUrl + rssUrl)

    if (!response.ok) throw new Error('Failed to fetch RSS feed')

    const xmlText = await response.text()
    posts.value = parseRSSFeed(xmlText)
  } catch (e) {
    console.error('RSS fetch error:', e)
    error.value = 'Unable to load posts. Visit Substack directly.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="substack-feed">
    <div v-if="loading" class="loading">Loading posts...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="posts-grid">
      <article v-for="post in posts" :key="post.link" class="post-card">
        <h3>
          <a :href="post.link" target="_blank" rel="noopener">
            {{ post.title }}
          </a>
        </h3>
        <time>{{ new Date(post.isoDate).toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric'
        }) }}</time>
        <p class="excerpt">{{ post.excerpt }}</p>
        <a :href="post.link" target="_blank" class="read-more">
          Read on Substack →
        </a>
      </article>
    </div>
    <div class="substack-cta">
      <a href="https://rahulrumalla.substack.com/" target="_blank" class="button">
        View All Posts on Substack
      </a>
    </div>
  </div>
</template>

<style scoped>
.substack-feed {
  max-width: 900px;
  margin: 0 auto;
  padding: 0;
}

.loading,
.error {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

.error {
  color: var(--vp-c-danger-1);
}

.posts-grid {
  display: grid;
  gap: 2.5rem;
  margin: 2.5rem 0;
}

.post-card {
  padding: 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  transition: all 0.2s ease;
}

.post-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  cursor: pointer;
}

.post-card h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1.3rem;
  border-bottom: none;
  letter-spacing: -0.01em;
}

.post-card h3 a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s;
}

.post-card h3 a:hover {
  color: var(--vp-c-brand-1);
}

.post-card time {
  display: block;
  margin-bottom: 1.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  font-weight: 500;
}

.excerpt {
  margin: 1.25rem 0;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  font-size: 1rem;
}

.read-more {
  display: inline-block;
  margin-top: 1rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: opacity 0.2s;
}

.read-more:hover {
  opacity: 0.8;
}

.substack-cta {
  margin-top: 3rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--vp-c-divider);
  text-align: center;
}

.button {
  display: inline-block;
  padding: 0.875rem 2rem;
  background: var(--vp-c-brand-1);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.button:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .substack-feed {
    padding: 0;
  }

  .post-card {
    padding: 1.5rem;
  }

  .post-card h3 {
    font-size: 1.1rem;
  }
}
</style>
