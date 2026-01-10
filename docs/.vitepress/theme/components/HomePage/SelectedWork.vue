<template>
  <div class="selected-work">
    <a href="/now" class="work-card">
      <h3>Safe Labs</h3>
      <p>Self-custody infrastructure for organizations and onchain operations.</p>
    </a>

    <a href="/now" class="work-card">
      <h3>SoundCloud</h3>
      <p>Platform and ecosystem leadership across integrations and partnerships.</p>
    </a>

    <a href="/now" class="work-card">
      <h3>Paperchain</h3>
      <p>Liquidity and payout systems for creator royalties.</p>
    </a>

    <a href="/now" class="work-card">
      <h3>Otterspace</h3>
      <p>Onchain credentials and identity primitives (EIP-4973).</p>
    </a>
  </div>
</template>

<style scoped>
.selected-work {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2.5rem;
}

.work-card {
  padding: 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: all 0.2s ease;
}

.work-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.work-card h3 {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border-bottom: none;
  letter-spacing: -0.01em;
}

.work-card p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .selected-work {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .work-card {
    padding: 1.5rem;
  }
}
</style>
