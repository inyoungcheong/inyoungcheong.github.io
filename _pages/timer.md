---
layout: page
title: Minimalist Timer
permalink: /timer/
description: A pomodoro timer with my go-to ambient sounds. 
---

<style>
  body {
    font-family: sans-serif;
    background: #fdfcf9;
    color: #333;
    padding: 2rem;
  }
  .timer {
    font-size: 4rem;
    margin: 1rem 0;
    text-align: center;
  }
  .status {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #555;
    font-style: italic;
  }
  .controls button {
    font-size: 1rem;
    padding: 0.5rem 1.2rem;
    margin: 0.5rem;
    border: none;
    background: #444;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  .log {
    margin-top: 2rem;
  }
  .block {
    background: #f2f2f2;
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 0.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
  .block:nth-child(odd) {
    background-color: #f9f7f3;
  }
  .block:nth-child(even) {
    background-color: #eaeff5;
  }
  .block strong {
    display: block;
    font-size: 1.05rem;
    margin-bottom: 0.25rem;
    color: #222;
  }
  .block span {
    font-size: 0.9rem;
    color: #666;
  }
  .unlabeled {
    opacity: 0.8;
    font-style: italic;
  }
</style>


<div class="status" id="status">Focus time – let's go!</div>
<div class="timer" id="timer">25:00</div>
<div class="controls">
  <button onclick="startTimer()">Start</button>
  <button onclick="pauseTimer()">Pause</button>
  <button onclick="resetTimer()">Reset</button>
  <label>Focus Duration:
    <select id="focusDuration" onchange="setFocusDuration(this.value)">
      <option value="25">25 min</option>
      <option value="50">50 min</option>
      <option value="90">90 min</option>
    </select>
  </label>
</div>

<div>
  <label for="ambientSelect">Choose Ambient Sound:</label>
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

<div>
  <label for="taskInput">What did you work on?</label><br>
  <input type="text" id="taskInput" placeholder="e.g. Drafted notes">
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
let timerInterval;
let timerRunning = false;
let isFocus = true;
let focusCount = 0;
let log = [];

function updateDisplay() {
  const minutes = Math.floor(time / 60).toString().padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');
  document.getElementById("timer").textContent = `${minutes}:${seconds}`;
}

function updateStatus() {
  const status = document.getElementById("status");
  if (isFocus) {
    status.textContent = "Focus";
  } else {
    status.textContent = (focusCount % 4 === 0) ? "You deserve it! Treat yourself." : "Break";
  }
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

