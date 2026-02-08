---
layout: page
title: Good News / Bad News
permalink: /news/
description: Celebrating wins and normalizing failures in academia.
nav: false
nav_order: 4
---

<style>
.news-toggle {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}
.news-toggle button {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  padding: 0.4rem 1.2rem;
  border: 1px solid var(--global-divider-color);
  border-radius: 20px;
  background: transparent;
  color: var(--global-text-color-light);
  cursor: pointer;
  transition: all 0.2s ease;
}
.news-toggle button.active,
.news-toggle button:hover {
  color: var(--global-text-color);
  border-color: var(--global-text-color);
}
.news-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}
@media (max-width: 768px) {
  .news-columns { grid-template-columns: 1fr; }
}
.news-column h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--global-divider-color);
}
.news-item {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--global-divider-color);
  transition: opacity 0.3s ease;
}
.news-item:last-child { border-bottom: none; }
.news-date {
  font-size: 0.75rem;
  color: var(--global-text-color-light);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.news-text {
  font-size: 0.9rem;
  margin-top: 0.2rem;
  line-height: 1.5;
}
.news-text a {
  color: var(--global-theme-color);
}
</style>

<div class="news-toggle">
  <button class="active" onclick="filterNews('all')">All</button>
  <button onclick="filterNews('good')">Good News</button>
  <button onclick="filterNews('bad')">Bad News</button>
</div>

<div class="news-columns">
  <div class="news-column" id="good-column">
    <h3>Good News</h3>
    {% assign good_news = site.data.news_items | where: "type", "good" %}
    {% for item in good_news %}
    <div class="news-item" data-type="good">
      <div class="news-date">{{ item.date }}</div>
      <div class="news-text">
        {% if item.link %}<a href="{{ item.link }}">{{ item.text }}</a>{% else %}{{ item.text }}{% endif %}
      </div>
    </div>
    {% endfor %}
  </div>

  <div class="news-column" id="bad-column">
    <h3>Bad News</h3>
    {% assign bad_news = site.data.news_items | where: "type", "bad" %}
    {% for item in bad_news %}
    <div class="news-item" data-type="bad">
      <div class="news-date">{{ item.date }}</div>
      <div class="news-text">{{ item.text }}</div>
    </div>
    {% endfor %}
    {% if bad_news.size == 0 %}
    <p style="color: var(--global-text-color-light); font-style: italic; font-size: 0.9rem;">Coming soon — normalizing failure, one rejection at a time.</p>
    {% endif %}
  </div>
</div>

<script>
function filterNews(type) {
  document.querySelectorAll('.news-toggle button').forEach(function(btn) {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  var goodCol = document.getElementById('good-column');
  var badCol = document.getElementById('bad-column');

  if (type === 'good') {
    goodCol.style.display = 'block';
    badCol.style.display = 'none';
    document.querySelector('.news-columns').style.gridTemplateColumns = '1fr';
  } else if (type === 'bad') {
    goodCol.style.display = 'none';
    badCol.style.display = 'block';
    document.querySelector('.news-columns').style.gridTemplateColumns = '1fr';
  } else {
    goodCol.style.display = 'block';
    badCol.style.display = 'block';
    document.querySelector('.news-columns').style.gridTemplateColumns = '1fr 1fr';
  }
}
</script>
