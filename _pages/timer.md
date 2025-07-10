---
layout: page
title: Minimalist Timer
permalink: /timer/
description: A pomodoro timer with my go-to ambient sounds. 
no_title: true
no_description: true
---


<style>
  :root {
    --light-bg: #fdfcf9;
    --light-text: #333;
    --dark-bg: #1e1e1e;
    --dark-text: #ddd;
    --accent-focus: #FF9687;
    --accent-break: #D8AE48;
  }

  @media (prefers-color-scheme: dark) {
    html, body {
      background: var(--dark-bg) !important;
      color: var(--dark-text) !important;
    }
    .controls button, select, input, textarea {
      background-color: #333;
      color: #eee;
    }
    .block {
      background-color: #2a2a2a;
    }
  }

  @media (prefers-color-scheme: light) {
    html, body {
      background: var(--light-bg);
      color: var(--light-text);
    }
  }

  body {
    font-family: 'Helvetica Neue', sans-serif;
    padding: 2rem;
    margin: 0;
    line-height: 1.6;
    transition: background 0.3s ease, color 0.3s ease;
  }

  .goals {
    max-width: 600px;
    margin: 0 auto 2rem auto;
  }

  .goal-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 0.5rem;
    transition: opacity 0.3s ease;
  }

  .goal-row input[type="text"] {
    flex: 1;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }

  .goal-row input[type="number"] {
    width: 60px;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }

  .goal-row input[type="checkbox"] {
    transform: scale(1.2);
  }

  .goal-row.checked {
    opacity: 0.4;
  }

  .goal-row button.remove-goal {
    background: transparent;
    border: none;
    font-size: 1.2rem;
    color: #888;
    cursor: pointer;
  }

  .add-goal-button {
    display: block;
    margin: 0.5rem 0;
    padding: 0.4rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    background-color: var(--accent-focus);
    color: white;
    cursor: pointer;
  }

  .circle-timer {
    width: 220px;
    height: 220px;
    margin: 2rem auto;
    position: relative;
    background: transparent !important;
  }

  svg text {
    fill: white;
  }

  .status {
    text-align: center;
    font-style: italic;
    margin-bottom: 1rem;
  }

  .controls {
    text-align: center;
    margin-top: 1rem;
  }

  .controls button, select, input {
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
  }

  .log {
    margin-top: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .block {
    background-color: #eaeff5;
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 0.75rem;
  }

  .unlabeled {
    opacity: 0.7;
    font-style: italic;
  }
</style>

<div class="goals">
  <h2>Today's Goals</h2>
  <div id="goalList"></div>
  <button class="add-goal-button" onclick="addGoal()">+ Add Goal</button>
</div>

<div class="status" id="status">Focus time – let's go!</div>

<div class="circle-timer">
  <svg viewBox="0 0 100 100" width="200" height="200">
    <circle cx="50" cy="50" r="45" fill="none" />
    <path id="pie" fill="var(--accent-focus)" transform="rotate(0,50,50)" />
    <text x="50" y="55" text-anchor="middle" font-size="16" id="timerText">25:00</text>
  </svg>
</div>

<div class="controls">
  <button onclick="startTimer()">Start</button>
  <button onclick="pauseTimer()">Pause</button>
  <button onclick="resetTimer()">Reset</button>
  <select id="focusDuration" onchange="setFocusDuration(this.value)">
    <option value="25">25 min</option>
    <option value="50">50 min</option>
    <option value="90">90 min</option>
  </select>
  <select id="ambientSelect" onchange="changeAmbient(this.value)">
    <option value="">No Ambient</option>
    <option value="birds">Park Birds</option>
    <option value="river">Mountain River</option>
    <option value="piano">Piano</option>
    <option value="lofi">Lo-fi</option>
    <option value="jazz">Jazz Brush</option>
    <option value="keyboard">Keyboard</option>
    <option value="morning">Morning Park</option>
  </select>
</div>

<div class="controls">
  <input type="text" id="taskInput" placeholder="What did you work on?">
  <button onclick="labelLastBlock()">Label Last Block</button>
</div>

<div class="log">
  <h2>Today's Focus Blocks</h2>
  <div id="logList"></div>
</div>

<script src="/assets/js/timer.js"></script>

