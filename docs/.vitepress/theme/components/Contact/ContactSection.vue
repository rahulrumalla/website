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
  gap: 2rem;
  margin: 2rem 0 4rem 0;
}

.contact-block {
  padding: 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  text-align: center;
}

.contact-block h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  border-bottom: none;
}

.contact-block p {
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.contact-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand-1);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.contact-button:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
}

.social-links {
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
  text-align: center;
}

.social-links h3 {
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  border-bottom: none;
}

.social-grid {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.social-link {
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 6px;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: all 0.2s;
  font-weight: 500;
}

.social-link:hover {
  background: var(--vp-c-brand-1);
  color: white;
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

  .social-grid {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .social-link {
    width: 100%;
    max-width: 300px;
  }
}
</style>
