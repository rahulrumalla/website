<script setup>
import { ref, onMounted } from "vue";

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

// Parse RSS XML using DOMParser
function parseRSSFeed(xmlText) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "text/xml");

  const items = xml.querySelectorAll("item");

  return Array.from(items)
    .slice(0, 10)
    .map((item) => {
      const title = item.querySelector("title")?.textContent || "";
      const link = item.querySelector("link")?.textContent || "";
      const pubDate = item.querySelector("pubDate")?.textContent || "";
      const description = item.querySelector("description")?.textContent || "";

      // Extract image URL from enclosure tag
      const enclosure = item.querySelector("enclosure");
      const imageUrl = enclosure?.getAttribute("url") || null;

      // Extract text excerpt (remove HTML tags)
      const excerpt =
        description.replace(/<[^>]*>/g, "").substring(0, 400) + "...";

      return {
        title,
        link,
        pubDate,
        isoDate: new Date(pubDate).toISOString(),
        excerpt,
        imageUrl,
      };
    });
}

onMounted(async () => {
  try {
    const proxyUrl = "https://api.allorigins.win/raw?url=";
    const rssUrl = encodeURIComponent("https://rahulrumalla.substack.com/feed");
    const response = await fetch(proxyUrl + rssUrl);

    if (!response.ok) throw new Error("Failed to fetch RSS feed");

    const xmlText = await response.text();
    posts.value = parseRSSFeed(xmlText);
  } catch (e) {
    console.error("RSS fetch error:", e);
    error.value = "Unable to load posts. Visit Substack directly.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="substack-feed">
    <div v-if="loading" class="loading">Loading posts...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="posts-grid">
      <a
        v-for="post in posts"
        :key="post.link"
        :href="post.link"
        target="_blank"
        rel="noopener"
        class="post-card"
      >
        <div class="post-image-container" v-if="post.imageUrl">
          <img
            :src="post.imageUrl"
            :alt="post.title"
            class="post-image"
            loading="lazy"
          />
        </div>

        <div class="post-image-placeholder" v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"
            ></path>
            <circle cx="12" cy="13" r="3"></circle>
          </svg>
        </div>

        <article class="post-content">
          <h3>{{ post.title }}</h3>
          <time>{{
            new Date(post.isoDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}</time>
          <p class="excerpt">{{ post.excerpt }}</p>
        </article>
      </a>
    </div>
    <div class="substack-cta">
      <a
        href="https://rahulrumalla.substack.com/"
        target="_blank"
        class="button"
      >
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
  font-size: var(--font-size-sm);
}

.error {
  color: var(--vp-c-danger-1);
}

.posts-grid {
  display: grid;
  gap: 1.5rem;
  margin: 2.5rem 0;
}

.post-card {
  display: flex;
  gap: 1.5rem;
  padding: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--radius-md);
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  color: inherit;
  box-shadow: var(--shadow-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.post-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-4px) scale(1.01);
  box-shadow: var(--shadow-lg), var(--shadow-warm);
}

.post-image-container {
  flex-shrink: 0;
  width: 240px;
  height: 240px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.post-card:hover .post-image {
  transform: scale(1.08) rotate(1deg);
}

.post-image-placeholder {
  flex-shrink: 0;
  width: 240px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--vp-c-brand-1) 0%,
    var(--vp-c-brand-2) 50%,
    #f4a261 100%
  );
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
  color: white;
  opacity: 0.7;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.post-image-placeholder svg {
  opacity: 0.8;
}

.post-content {
  flex: 1;
  padding: 2rem;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.post-card h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: var(--font-size-xl);
  border-bottom: none;
  letter-spacing: var(--letter-spacing-normal);
  color: var(--vp-c-text-1);
  line-height: var(--line-height-snug);
}

.post-card time {
  display: block;
  margin-bottom: 1rem;
  color: var(--vp-c-text-2);
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.excerpt {
  margin: 0;
  line-height: var(--line-height-relaxed);
  color: var(--vp-c-text-2);
  font-size: var(--font-size-base);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.substack-cta {
  margin-top: 3rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--vp-c-divider);
  text-align: center;
}

.button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(
    180deg,
    var(--vp-c-brand-1) 0%,
    var(--vp-c-brand-3) 100%
  );
  box-shadow: var(--shadow-sm), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: var(--radius-sm);
  font-weight: 500;
  font-size: var(--font-size-base);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.button:hover {
  background: linear-gradient(
    180deg,
    var(--vp-c-brand-2) 0%,
    var(--vp-c-brand-1) 100%
  );
  color: white;
  box-shadow: var(--shadow-lg), var(--shadow-warm),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
}

.button:active {
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

@media (max-width: 768px) {
  .substack-feed {
    padding: 0;
  }

  .post-card {
    flex-direction: column;
    gap: 0;
  }

  .post-image-container,
  .post-image-placeholder {
    width: 100%;
    height: 200px;
  }

  .post-content {
    padding: 1.5rem;
  }

  .post-card h3 {
    font-size: var(--font-size-lg);
  }

  .excerpt {
    font-size: var(--font-size-sm);
    -webkit-line-clamp: 3;
  }
}

@media (max-width: 640px) {
  .post-image-container,
  .post-image-placeholder {
    height: 180px;
  }

  .post-content {
    padding: 1.25rem;
  }
}
</style>
