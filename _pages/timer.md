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

  .main-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 3rem;
    align-items: start;
  }

  .timer-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: sticky;
    top: 2rem;
  }

  .section-header h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .goals {
    max-width: 100%;
  }

  .goal-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 0.15rem;
    transition: opacity 0.3s ease;
    padding: 0.2rem 0;
    border-bottom: 1px solid #f0f0f0;
  }

  @media (prefers-color-scheme: dark) {
    .goal-row {
      border-bottom: 1px solid #333;
    }
  }

  .goal-row:last-of-type {
    border-bottom: none;
  }

  .goal-row input[type="text"] {
    flex: 1;
    padding: 0.3rem 0;
    border: none;
    background: transparent;
    font-size: 0.95rem;
    outline: none;
  }

  .goal-row.readonly input[type="text"] {
    cursor: pointer;
  }

  .goal-row input[type="text"]:focus {
    background: rgba(255, 150, 135, 0.1);
    padding: 0.3rem 0.5rem;
    border-radius: 3px;
  }

  .goal-row input[type="text"]::placeholder {
    color: #bbb;
    font-style: italic;
  }

  .goal-row input[type="number"] {
    width: 50px;
    padding: 0.2rem;
    border: 1px solid #ddd;
    border-radius: 3px;
    font-size: 0.85rem;
    text-align: center;
  }

  .goal-row input[type="checkbox"] {
    transform: scale(1.1);
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
    margin: 0.75rem 0;
    padding: 0.3rem 0.8rem;
    font-size: 0.9rem;
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
    fill: var(--light-text);
  }

  @media (prefers-color-scheme: dark) {
    svg text {
      fill: var(--dark-text);
    }
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
    max-width: 100%;
  }

  .block {
    background-color: #eaeff5;
    padding: 0.75rem;
    border-radius: 8px;
    margin-bottom: 0.5rem;
  }

  .unlabeled {
    opacity: 0.7;
    font-style: italic;
  }

  /* 모바일 대응 */
  @media (max-width: 768px) {
    .main-container {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .timer-section {
      position: static;
    }
    
    body {
      padding: 1rem;
    }
  }
</style>

<div class="main-container">
  <div class="timer-section">
    <div class="section-header">
      <h2>Timer</h2>
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
  </div>

  <div class="content-section">
    <div class="goals">
      <div class="section-header">
        <h2>Today's Goals</h2>
      </div>
      <div id="goalList"></div>
      <button class="add-goal-button" onclick="addGoal()">+ Add Goal</button>
    </div>

    <div class="log">
      <div class="section-header">
        <h2>Today's Focus Blocks</h2>
      </div>
      <div class="controls">
        <input type="text" id="taskInput" placeholder="What did you work on?">
        <button onclick="labelLastBlock()">Label Last Block</button>
      </div>
      <div id="logList"></div>
    </div>
  </div>
</div>

<footer style="margin-top: 3rem; text-align: center;">
  <div style="font-size: 1rem; margin-bottom: 0.5rem;">
    🎧 More Ambient Sounds
  </div>
  <iframe 
    src="https://archive.org/embed/relaxingsounds" 
    width="500" height="30" 
    frameborder="0" 
    webkitallowfullscreen 
    mozallowfullscreen 
    allowfullscreen>
  </iframe>
</footer>

<script src="/assets/js/timer.js"></script>

<script>
// 목표 관련 함수들 (timer.js에 없는 기능들)
function addGoal() {
  const goalList = document.getElementById('goalList');
  const goalRow = document.createElement('div');
  goalRow.className = 'goal-row';
  goalRow.innerHTML = `
    <input type="checkbox" onchange="toggleGoal(this)">
    <input type="text" placeholder="Enter your goal">
    <input type="number" placeholder="25" min="1" max="999">
    <button class="remove-goal" onclick="removeGoal(this)">×</button>
  `;
  goalList.appendChild(goalRow);
  
  // 새로 추가된 텍스트 입력에 이벤트 리스너 추가
  const textInput = goalRow.querySelector('input[type="text"]');
  handleGoalInput(textInput);
  textInput.focus(); // 자동 포커스
  
  // localStorage 저장 (timer.js의 saveToLocal 함수 활용)
  if (typeof saveToLocal === 'function') {
    saveToLocal();
  }
}

function toggleGoal(checkbox) {
  const row = checkbox.parentElement;
  if (checkbox.checked) {
    row.classList.add('checked');
  } else {
    row.classList.remove('checked');
  }
  
  // localStorage 저장
  if (typeof saveToLocal === 'function') {
    saveToLocal();
  }
}

function removeGoal(button) {
  button.parentElement.remove();
  
  // localStorage 저장
  if (typeof saveToLocal === 'function') {
    saveToLocal();
  }
}

// 목표 입력 완료 시 읽기 모드로 전환
function handleGoalInput(input) {
  // 엔터키 처리
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && input.value.trim()) {
      finalizeGoal(input);
    }
  });
  
  // 포커스 아웃 처리
  input.addEventListener('blur', function() {
    if (input.value.trim()) {
      finalizeGoal(input);
    }
  });
}

function finalizeGoal(input) {
  const goalRow = input.parentElement;
  goalRow.classList.add('readonly');
  input.blur();
  
  // localStorage 저장
  if (typeof saveToLocal === 'function') {
    saveToLocal();
  }
  
  // 클릭 시 다시 편집 가능하게
  input.addEventListener('click', function editGoal() {
    goalRow.classList.remove('readonly');
    input.focus();
    input.removeEventListener('click', editGoal); // 이벤트 리스너 제거
  });
}

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
  // 기본으로 목표 3개 생성
  for (let i = 0; i < 3; i++) {
    addGoal();
  }
  
  // 페이지 로드 시 기존 목표들에 이벤트 리스너 추가
  setTimeout(function() {
    const goalInputs = document.querySelectorAll('.goal-row input[type="text"]:not([data-enhanced])');
    goalInputs.forEach(input => {
      input.setAttribute('data-enhanced', 'true');
      handleGoalInput(input);
    });
  }, 100); // timer.js의 loadFromLocal 실행 후
});
</script>
