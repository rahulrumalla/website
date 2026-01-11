<script setup>
import { ref, onMounted, watch } from 'vue';

const cursorEnabled = ref(true);

onMounted(() => {
  // Load preference from localStorage
  const saved = localStorage.getItem('cursor-trail-enabled');
  if (saved !== null) {
    cursorEnabled.value = saved === 'true';
  }

  // Emit initial state
  emitState();
});

watch(cursorEnabled, (newVal) => {
  localStorage.setItem('cursor-trail-enabled', String(newVal));
  emitState();
});

function emitState() {
  window.dispatchEvent(new CustomEvent('cursor-trail-toggle', {
    detail: { enabled: cursorEnabled.value }
  }));
}

function toggleCursor() {
  cursorEnabled.value = !cursorEnabled.value;
}
</script>

<template>
  <div class="cursor-toggle">
    <button
      @click="toggleCursor"
      :class="{ active: cursorEnabled }"
      :title="cursorEnabled ? 'Disable cursor effect' : 'Enable cursor effect'"
      class="toggle-button"
    >
      <svg
        v-if="cursorEnabled"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
        <path d="M13 13l6 6"/>
      </svg>
      <svg
        v-else
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <line x1="3" y1="3" x2="21" y2="21"/>
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" opacity="0.4"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.cursor-toggle {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}

.toggle-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--vp-c-text-2);
}

.toggle-button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
}

.toggle-button.active {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

/* Hide on mobile/tablet since cursor effect is disabled there anyway */
@media (max-width: 960px) {
  .cursor-toggle {
    display: none;
  }
}
</style>
