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
    --accent: #b18bd7; /* 라벤더 색 */
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
    transition: background 0.3s ease, color 0.3s ease;
  }

  .circle-timer {
    width: 220px;
    height: 220px;
    margin: 2rem auto;
    position: relative;
    background: transparent !important;
  }

  svg text {
    fill: currentColor;
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
  <svg viewBox="0 0 100 100" width="200" height="200">
    <circle cx="50" cy="50" r="45" fill="none" />
    <path id="pie" fill="var(--accent)"></path>
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
    <option value="morning">Morning Park</option>
    <option value="river">Mountain River</option>
    <option value="summer">Summer Lo-fi</option>
    <option value="jazz">Jazz Brush</option>
    <option value="piano">Piano</option>
    <option value="keyboard">Keyboard</option>
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

<script>
let focusTime = 25 * 60;
let shortBreakTime = 5 * 60;
let longBreakTime = 30 * 60;
let time = focusTime;
let timerInterval, timerRunning = false, isFocus = true, focusCount = 0, log = [];

const pie = document.getElementById("pie");
const timerText = document.getElementById("timerText");

function polarToCartesian(cx, cy, r, angle) {
  const rad = (angle - 90) * Math.PI / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function drawPie(percent) {
  const [cx, cy, r] = [50, 50, 45];
  const angle = percent * 360;
  const [x, y] = polarToCartesian(cx, cy, r, angle);
  const largeArc = angle > 180 ? 1 : 0;
  const d = `
    M ${cx} ${cy}
    L ${cx} ${cy - r}
    A ${r} ${r} 0 ${largeArc} 1 ${x} ${y}
    Z
  `;
  pie.setAttribute("d", d);
}

function updateDisplay() {
  const minutes = Math.floor(time / 60).toString().padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');
  timerText.textContent = `${minutes}:${seconds}`;
  const total = isFocus ? focusTime : (focusCount % 4 === 0 ? longBreakTime : shortBreakTime);
  drawPie(time / total);
}

function updateStatus() {
  document.getElementById("status").textContent = isFocus
    ? "Focus"
    : (focusCount % 4 === 0 ? "You deserve it! Treat yourself." : "Break");
}

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;

  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }

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
  stopAmbient();
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

// Web Audio API – seamless ambient playback
let audioContext, sourceNode;
const audioFiles = {
  birds: "/assets/audio/park_birds.mp3",
  morning: "/assets/audio/morning_park.mp3",
  river: "/assets/audio/mountain_river.mp3",
  summer: "/assets/audio/summer_lofi.mp3",
  jazz: "/assets/audio/jazz_brush.mp3",
  piano: "/assets/audio/piano.mp3",
  keyboard: "/assets/audio/keyboard.mp3"
};

function stopAmbient() {
  if (sourceNode) {
    try { sourceNode.stop(); } catch (e) {}
    sourceNode.disconnect();
    sourceNode = null;
  }
}

function changeAmbient(mood) {
  if (!mood || !audioFiles[mood]) {
    stopAmbient();
    return;
  }

  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  stopAmbient();

  fetch(audioFiles[mood])
    .then(res => res.arrayBuffer())
    .then(data => audioContext.decodeAudioData(data))
    .then(buffer => {
      sourceNode = audioContext.createBufferSource();
      sourceNode.buffer = buffer;
      sourceNode.loop = true;
      sourceNode.connect(audioContext.destination);
      sourceNode.start(0);
    })
    .catch(err => {
      console.error("Audio error:", err);
    });
}

updateDisplay();
updateStatus();
</script>


