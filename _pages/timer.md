---
layout: page
title: Minimalist Timer
permalink: /timer/
description: A pomodoro timer with my go-to ambient sounds. 
no_title: true
no_description: true
---

<style>
  .callout-box {
    background-color: #f8f8f8;
    border-left: 4px solid #7a6ff0;
    padding: 1.25rem;
    border-radius: 10px;
    font-family: system-ui, sans-serif;
    margin-bottom: 2rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  }

  details.callout-box summary {
    cursor: pointer;
    font-weight: 600;
    font-size: 1.1rem;
    color: #333;
    outline: none;
  }

  details.callout-box[open] summary::after {
    content: "▲";
    float: right;
    font-size: 0.8rem;
    color: #888;
  }

  details.callout-box summary::after {
    content: "▼";
    float: right;
    font-size: 0.8rem;
    color: #888;
  }

  .callout-box ul {
    margin-top: 1rem;
    padding-left: 1.2rem;
    line-height: 1.7;
    color: #444;
    font-size: 0.95rem;
  }

  .callout-box li {
    margin-bottom: 1rem;
  }

  @media (prefers-color-scheme: dark) {
    .callout-box {
      background-color: #2a2a2a;
      border-left-color: #a493ff;
      color: #eee;
    }
    .callout-box ul {
      color: #ccc;
    }
    details.callout-box summary {
      color: #eee;
    }
  }
</style>


<details class="callout-box">
  <summary>💡 How to Use This Timer</summary>
  <ul>
    <li> This is a Pomodoro timer ⏱️! You can adjust your focus session to 25, 50, or 90 minutes. 5-minute short breaks and a 30-minute long break after 4 focus sessions.</li>
    <li> I always like to have white noise when I focus. You’ll find looped music below the timer, or unfold “More Ambient Sounds” for long-play tracks from <a href="https://archive.org/details/relaxingsounds/" target="_blank">archive.org</a> curated by GenreFan.</li>
    <li> You can add goals for the day. Breaking tasks into small chunks makes them easier to tackle. Add as many as you like, assign time, and check them off ✅ when you’re done. </li>
    <li> Feeling stuck or overwhelmed? Try this <a href="https://inyoungcheong.github.io/planner" target="_blank">customized chatbot</a> I built. It can help you de-clutter and reframe your tasks more clearly.</li>
    <li> After a focus session, a block appears in “Today's Focus Blocks.” Label it to reflect what you actually did, even if you got distracted (e.g., “Watching Netflix”). This helps track habits over time.</li>
    <li> Good luck with your work today! </li>
  </ul>
</details>




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

              <style>
          .ambient-section {
            margin-top: 2rem;
            text-align: center;
          }
        
          .ambient-toggle {
            font-size: 1rem;
            cursor: pointer;
            color: var(--accent-focus);
            background: none;
            border: none;
            margin-bottom: 1rem;
          }
        
          .ambient-list {
            display: none; /* 처음에는 접혀 있음 */
            flex-direction: column;
            gap: 1rem;
            align-items: center;
          }
        
          .ambient-item iframe {
            width: 100%;
            max-width: 250px;
            height: 30px;
            border: none;
          }
        
          .ambient-item strong {
            font-size: 1rem;
          }
        
          @media (max-width: 600px) {
            .ambient-item strong {
              font-size: 0.95rem;
            }
          }
        </style>
        
        <div class="ambient-section">
          <button class="ambient-toggle" onclick="toggleAmbientList()">🎧 More Ambient Sounds 🔽</button>
        
          <div id="ambientList" class="ambient-list">
            <div class="ambient-item">
              🔥 <strong>Fireplace</strong><br>
              <iframe src="https://archive.org/embed/relaxingsounds/FIRE+2+3h+Blazing+Fireplace.mp3?start=2" allowfullscreen></iframe>
            </div>
            <div class="ambient-item">
              🔥 <strong>Campfire</strong><br>
              <iframe src="https://archive.org/embed/relaxingsounds/FIRE+1+10h+CracklingCampfire%2CCrickets%2CRainOrRiver-Night.mp3" allowfullscreen></iframe>
            </div>
            <div class="ambient-item">
              💧 <strong>Waterfall</strong><br>
              <iframe src="https://archive.org/embed/relaxingsounds/Falls+1+9h+River+Rapids(High+pitch)%2CLiteSplashing.mp3?start=6" allowfullscreen></iframe>
            </div>
            <div class="ambient-item">
              🚂 <strong>Train</strong><br>
              <iframe src="https://archive.org/embed/relaxingsounds/Train+3+9h+Med.LiteRumble-NoHornsOrBells.mp3?start=3" allowfullscreen></iframe>
            </div>
            <div class="ambient-item">
              ✈️ <strong>Airplane</strong><br>
              <iframe src="https://archive.org/embed/relaxingsounds/Wind+1+8h+(or+Rapids)+Gentle%2CLowPitch%2CBrownNoise.mp3?start=300" allowfullscreen></iframe>
            </div>
            <div class="ambient-item">
              ❄️ <strong>Snowfall</strong><br>
              <iframe src="https://archive.org/embed/relaxingsounds/Snowfall+%26+Wind(Lite)+10h+Dusk+into+Night-Forest.mp3?start=4" allowfullscreen></iframe>
            </div>
            <div class="ambient-item">
              🌿 <strong>Rainforest</strong><br>
              <iframe src="https://archive.org/embed/relaxingsounds/Snowfall+%26+Wind(Lite)+10h+Dusk+into+Night-Forest.mp3" allowfullscreen></iframe>
            </div>
            <div class="ambient-item">
              🌧️ <strong>Rain</strong><br>
              <iframe src="https://archive.org/embed/relaxingsounds/Rain+7+(Lightest)+8h+DripsOnTrees-no+thunder.mp3?start=300" allowfullscreen></iframe>
            </div>
          </div>
        </div>      
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

<script>
  function toggleAmbientList() {
    const list = document.getElementById('ambientList');
    const button = document.querySelector('.ambient-toggle');
    const isHidden = list.style.display === 'none' || list.style.display === '';
    list.style.display = isHidden ? 'flex' : 'none';
    button.innerHTML = isHidden ? '🎧 Hide Ambient Sounds 🔼' : '🎧 More Ambient Sounds 🔽';
  }
</script>

