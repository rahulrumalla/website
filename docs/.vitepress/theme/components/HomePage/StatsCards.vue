<template>
  <section class="stats-section">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">$100B+</div>
        <div class="stat-label">assets secured</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">$1T+</div>
        <div class="stat-label">total volume processed</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">300+</div>
        <div class="stat-label">networks supported</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">57M+</div>
        <div class="stat-label">Safe accounts deployed</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-section {
  margin: 4rem auto;
  padding: 0 1.5rem;
  max-width: 1200px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}

.stat-card {
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  text-transform: lowercase;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .stat-value {
    font-size: 2rem;
  }
}
</style>
