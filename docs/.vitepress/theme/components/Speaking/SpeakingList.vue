<script setup>
import { ref, computed } from "vue";
import speakingData from "../../../data/speaking.json";

const selectedTag = ref(null);

const sortedTalks = computed(() => {
  return [...speakingData].sort((a, b) => b.dateSort.localeCompare(a.dateSort));
});

const filteredTalks = computed(() => {
  if (!selectedTag.value) return sortedTalks.value;
  return sortedTalks.value.filter((talk) =>
    talk.tags.includes(selectedTag.value)
  );
});

const allTags = computed(() => {
  const tags = new Set();
  speakingData.forEach((talk) => talk.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
});

// Helper to get platform display names
const getVideoTypeName = (type) => {
  const names = {
    'x-broadcast': 'X',
    'spotify': 'Spotify',
    'external-video': 'External Platform'
  };
  return names[type] || 'External Platform';
};
</script>

<template>
  <div class="speaking-list">
    <div class="filters" v-if="allTags.length > 0">
      <button
        @click="selectedTag = null"
        :class="{ active: !selectedTag }"
        class="tag-filter"
      >
        All
      </button>
      <button
        v-for="tag in allTags"
        :key="tag"
        @click="selectedTag = tag"
        :class="{ active: selectedTag === tag }"
        class="tag-filter"
      >
        {{ tag }}
      </button>
    </div>

    <article v-for="talk in filteredTalks" :key="talk.id" class="talk-entry">
      <h2>{{ talk.title }}</h2>

      <div class="talk-meta">
        <span class="event">{{ talk.event }}</span>
        <span v-if="talk.location" class="location">{{ talk.location }}</span>
        <time>{{ talk.date }}</time>
      </div>

      <p v-if="talk.description" class="description">
        {{ talk.description }}
      </p>

      <div v-if="talk.videoId && talk.videoType === 'youtube'" class="video">
        <iframe
          :src="`https://www.youtube.com/embed/${talk.videoId}${
            talk.startTime ? '?start=' + talk.startTime : ''
          }`"
          width="560"
          height="315"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>

      <!-- External Video Card (X Broadcasts, Spotify, etc.) -->
      <div
        v-if="talk.videoType && ['x-broadcast', 'spotify', 'external-video'].includes(talk.videoType)"
        class="external-video-card"
      >
        <a
          :href="talk.videoUrl || (talk.links && talk.links[0]?.url)"
          target="_blank"
          rel="noopener noreferrer"
          class="video-card-link"
          :aria-label="`Go to ${talk.title} on ${getVideoTypeName(talk.videoType)}`"
        >
          <!-- External Link Icon (Top Right) -->
          <svg class="external-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
          </svg>

          <!-- Center Icon & Play Button -->
          <div class="video-card-icon">
            <!-- X Logo SVG -->
            <svg v-if="talk.videoType === 'x-broadcast'" class="icon-x" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <!-- Spotify Logo SVG -->
            <svg v-else-if="talk.videoType === 'spotify'" class="icon-spotify" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>

            <!-- Play Button Overlay -->
            <div class="play-overlay">
              <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>

          <!-- Bottom Text -->
          <div class="video-card-title">Go to {{ getVideoTypeName(talk.videoType) }}</div>
        </a>
      </div>

      <div v-if="talk.links && talk.links.length > 0" class="links">
        <a
          v-for="link in talk.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener"
          class="talk-link"
        >
          {{ link.label }} →
        </a>
      </div>

      <div v-if="talk.tags && talk.tags.length > 0" class="tags">
        <span v-for="tag in talk.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </article>
  </div>
</template>

<style scoped>
.speaking-list {
  max-width: 900px;
  margin: 0 auto;
  padding-top: 2rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-bottom: 3rem;
}

.tag-filter {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--radius-sm);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
  font-size: var(--font-size-sm);
}

.tag-filter:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.tag-filter.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.talk-entry {
  padding-bottom: 3rem;
}

.talk-entry:last-child {
  border-bottom: none;
}

.talk-entry h2 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: var(--font-size-2xl);
  border-bottom: none;
  letter-spacing: var(--letter-spacing-normal);
}

.talk-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-2);
  font-size: var(--font-size-sm);
}

.talk-meta span:not(:last-child)::after {
  content: "•";
  margin-left: 0.5rem;
}

.description {
  margin: 1.5rem 0;
  line-height: var(--line-height-normal);
}

.video {
  margin: 2.5rem 0;
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  box-shadow:
    var(--shadow-lg),
    0 0 0 1px rgba(0, 0, 0, 0.05);
}

.video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0;
}

/* ============================================
   External Video Card Styles
   ============================================ */

/* Container - matches YouTube embed height exactly */
.external-video-card {
  margin: 2.5rem 0;
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: var(--shadow-lg), 0 0 0 1px rgba(0, 0, 0, 0.05);
  background: linear-gradient(
    135deg,
    rgba(217, 122, 82, 0.1) 0%,
    rgba(228, 143, 92, 0.05) 100%
  );
}

/* Link fills entire card */
.video-card-link {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: inherit;
  cursor: pointer !important;
}

/* Ensure all children inherit pointer cursor */
.video-card-link * {
  cursor: pointer !important;
}

/* External Link Icon - Top Right */
.external-link-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 3;
  width: 20px;
  height: 20px;
  color: white;
  opacity: 0.8;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

/* Center Icon & Play Button */
.video-card-icon {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

/* Platform Icons */
.icon-x,
.icon-spotify {
  width: 48px;
  height: 48px;
  color: var(--vp-c-text-2);
  opacity: 0.3;
}

/* Play Button Overlay */
.play-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72px;
  height: 72px;
  background: var(--vp-c-brand-1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
}

.play-icon {
  width: 28px;
  height: 28px;
  color: white;
  margin-left: 3px; /* Visual centering */
}

/* Bottom Text */
.video-card-title {
  position: absolute;
  bottom: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  font-family: 'Space Grotesk', sans-serif;
  white-space: nowrap;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* Dark Mode */
.dark .external-video-card {
  background: linear-gradient(
    135deg,
    rgba(217, 122, 82, 0.08) 0%,
    rgba(228, 143, 92, 0.03) 100%
  );
}

/* Responsive */
@media (max-width: 768px) {
  .external-link-icon {
    top: 0.75rem;
    right: 0.75rem;
    width: 18px;
    height: 18px;
  }

  .video-card-icon {
    width: 64px;
    height: 64px;
  }

  .icon-x,
  .icon-spotify {
    width: 36px;
    height: 36px;
  }

  .play-overlay {
    width: 56px;
    height: 56px;
  }

  .play-icon {
    width: 22px;
    height: 22px;
  }

  .video-card-title {
    bottom: 1rem;
    font-size: 0.875rem;
  }
}

/* Focus state for accessibility */
.video-card-link:focus-visible {
  outline: 3px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.5rem 0;
}

.talk-link {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: var(--radius-sm);
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: all 0.2s;
  font-size: var(--font-size-sm);
  cursor: pointer !important;
}

.talk-link:hover {
  background: var(--vp-c-brand-1);
  color: white;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .speaking-list {
    padding: 0;
  }

  .talk-entry h2 {
    font-size: var(--font-size-xl);
  }

  .filters {
    margin-bottom: 2rem;
  }
}
</style>
