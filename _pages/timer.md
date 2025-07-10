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
    --accent: #6184d8;
  }

  @media (prefers-color-scheme: dark) {
    body {
      background: var(--dark-bg);
      color: var(--dark-text);
    }
    .controls button, select, input {
      background-color: #333;
      color: #eee;
    }
    .block {
      background-color: #2a2a2a;
    }
  }

  @media (prefers-color-scheme: light) {
    body {
      background: var(--light-bg);
      color: var(--light-text);
    }
  }

  body {
    font-family: 'Helvetica Neue', sans-serif;
    padding: 2rem;
    margin: 0;
    line-height: 1.6;
  }

  .circle-timer {
    width: 220px;
    height: 220px;
    margin: 2rem auto;
    position: relative;
  }

  .circle-timer svg {
    transform: rotate(-90deg);
    width: 100%;
    height: 100%;
  }

  .circle-timer text {
    fill: var(--accent);
    font-size: 1.8rem;
    dominant-baseline: middle;
    text-anchor: middle;
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

<div class="status" id="status">Focus time – let's go!</div>

<div class="circle-timer">
  <svg viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="45" stroke="#eee" stroke-width="10" fill="none"/>
    <circle id="progress" cx="50" cy="50" r="45" stroke="var(--accent)" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="282.6" stroke-dashoffset="0"/>
    <text x="50" y="50" id="circleText">25:00</text>
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
    <option value="morning">Morning Park</option>
    <option value="river">Mountain River</option>
    <option value="summer">Summer Lo-fi</option>
    <option value="jazz">Jazz Brush</option>
    <option value="piano">Piano</option>
    <option value="keyboard">Keyboard</option>
  </select>
</div>

<audio id="bgAudio" loop></audio>

<div class="controls">
  <input type="text" id="taskInput" placeholder="What did you work on?">
  <button onclick="labelLastBlock()">Label Last Block</button>
</div>

<div class="log">
  <h2>Today's Focus Blocks</h2>
  <div id="logList"></div>
</div>

<script>
let focusTime = 25 * 60;
let shortBreakTime = 5 * 60;
let longBreakTime = 30 * 60;
let time = focusTime;
let timerInterval, timerRunning = false, isFocus = true, focusCount = 0, log = [];

function updateDisplay() {
  const minutes = Math.floor(time / 60).toString().padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');
  document.getElementById("circleText").textContent = `${minutes}:${seconds}`;
  const progress = document.getElementById("progress");
  const total = isFocus ? focusTime : (focusCount % 4 === 0 ? longBreakTime : shortBreakTime);
  const offset = 282.6 * (1 - time / total);
  progress.setAttribute("stroke-dashoffset", offset.toFixed(1));
}

function updateStatus() {
  document.getElementById("status").textContent = isFocus
    ? "Focus"
    : (focusCount % 4 === 0 ? "You deserve it! Treat yourself." : "Break");
}

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  document.getElementById("bgAudio").play();
  updateStatus();
  timerInterval = setInterval(() => {
    time--;
    updateDisplay();
    if (time <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg").play();
      const endTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      if (isFocus) {
        focusCount++;
        log.push({ text: '', duration: `${focusTime / 60} min`, time: endTime });
        renderLog();
        time = (focusCount % 4 === 0) ? longBreakTime : shortBreakTime;
        isFocus = false;
      } else {
        time = focusTime;
        isFocus = true;
      }
      updateDisplay();
      updateStatus();
      startTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  document.getElementById("bgAudio").pause();
}

function resetTimer() {
  pauseTimer();
  time = focusTime;
  isFocus = true;
  focusCount = 0;
  updateDisplay();
  updateStatus();
}

function setFocusDuration(minutes) {
  focusTime = parseInt(minutes) * 60;
  resetTimer();
}

function labelLastBlock() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text && log.length > 0) {
    for (let i = log.length - 1; i >= 0; i--) {
      if (!log[i].text) {
        log[i].text = text;
        break;
      }
    }
    input.value = '';
    renderLog();
  }
}

function renderLog() {
  const list = document.getElementById("logList");
  list.innerHTML = '';
  log.slice().reverse().forEach(block => {
    const div = document.createElement("div");
    div.className = "block" + (block.text ? '' : ' unlabeled');
    div.innerHTML = block.text
      ? `<strong>${block.text}</strong><span>${block.duration} @ ${block.time}</span>`
      : `<strong>Untitled Block</strong><span>${block.duration} @ ${block.time}</span>`;
    list.appendChild(div);
  });
}

function changeAmbient(mood) {
  const bg = document.getElementById("bgAudio");
  const sources = {
    birds: "/assets/audio/park_birds.mp3",
    morning: "/assets/audio/morning_park.mp3",
    river: "/assets/audio/mountain_river.mp3",
    summer: "/assets/audio/summer_lofi.mp3",
    jazz: "/assets/audio/jazz_brush.mp3",
    piano: "/assets/audio/piano.mp3",
    keyboard: "/assets/audio/keyboard.mp3"
  };
  if (sources[mood]) {
    bg.src = sources[mood];
    bg.play();
  } else {
    bg.pause();
    bg.src = '';
  }
}

updateDisplay();
updateStatus();
</script>


