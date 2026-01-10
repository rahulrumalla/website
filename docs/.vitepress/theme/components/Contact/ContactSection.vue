<template>
  <div class="contact-section">
    <div class="contact-grid">
      <div class="contact-block">
        <h3>Speaking & Media</h3>
        <p>Talks, podcasts, and media inquiries.</p>
        <a href="mailto:speaking@rahulrumalla.com" class="contact-button">
          speaking (at) rahulrumalla.com
        </a>
      </div>

      <div class="contact-block">
        <h3>General</h3>
        <p>General inquiries and other topics.</p>
        <a href="mailto:me@rahulrumalla.com" class="contact-button">
          hello (at) rahulrumalla.com
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-section {
  max-width: 900px;
  margin: 0 auto;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0 4rem 0;
}

.contact-block {
  padding: 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--radius-md);
  background: var(--vp-c-bg-soft);
  text-align: center;
}

.contact-block h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: var(--font-size-xl);
  border-bottom: none;
  letter-spacing: var(--letter-spacing-normal);
}

.contact-block p {
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-2);
  line-height: var(--line-height-normal);
}

.contact-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand-1);
  color: white;
  text-decoration: none;
  border-radius: var(--radius-sm);
  font-weight: 500;
  transition: all 0.2s;
  font-size: var(--font-size-sm);
}

.contact-button:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .contact-section {
    padding: 0 1rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .contact-block {
    padding: 1.5rem;
  }
}
</style>
