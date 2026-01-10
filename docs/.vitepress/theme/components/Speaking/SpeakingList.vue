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
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
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
  font-size: 1.5rem;
  border-bottom: none;
}

.talk-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.talk-meta span:not(:last-child)::after {
  content: "•";
  margin-left: 0.5rem;
}

.description {
  margin: 1.5rem 0;
  line-height: 1.6;
}

.video {
  margin: 2rem 0;
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
}

.video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
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
  border-radius: 6px;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: all 0.2s;
  font-size: 0.9rem;
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
  border-radius: 4px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .speaking-list {
    padding: 0;
  }

  .talk-entry h2 {
    font-size: 1.25rem;
  }

  .filters {
    margin-bottom: 2rem;
  }
}
</style>
