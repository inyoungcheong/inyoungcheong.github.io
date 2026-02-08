---
layout: default
permalink: /cv/
title: cv
nav: true
nav_order: 3
---

<div class="cv-page">
  <div class="cv-header">
    <h1 class="cv-title">Curriculum Vitae</h1>
    <a class="cv-download" href="{{ '/assets/pdf/CV_12152025.pdf' | relative_url }}" download>
      <i class="fas fa-download"></i> Download PDF
    </a>
  </div>
  <div class="cv-viewer">
    <iframe src="{{ '/assets/pdf/CV_12152025.pdf' | relative_url }}" width="100%" height="100%" frameborder="0"></iframe>
  </div>
</div>

<style>
.cv-page {
  max-width: 900px;
  margin: 0 auto;
}
.cv-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.cv-title {
  font-family: 'Space Mono', monospace;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0;
}
.cv-download {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.6rem 1.2rem;
  border: 1px solid var(--global-text-color-light);
  border-radius: 6px;
  color: var(--global-text-color);
  text-decoration: none;
  transition: all 0.3s ease;
}
.cv-download:hover {
  background: var(--global-text-color);
  color: var(--global-bg-color);
  text-decoration: none;
}
.cv-download i {
  margin-right: 0.4rem;
}
.cv-viewer {
  width: 100%;
  height: 85vh;
  border: 1px solid var(--global-divider-color);
  border-radius: 8px;
  overflow: hidden;
}
.cv-viewer iframe {
  display: block;
}
</style>
