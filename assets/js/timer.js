// timer.js

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
  drawPie(1 - (time / total));
  pie.setAttribute("fill", isFocus ? "var(--accent-focus)" : "var(--accent-break)");
}

function updateStatus() {
  const status = document.getElementById("status");
  if (isFocus) {
    status.textContent = "Focus";
  } else {
    status.textContent = (focusCount % 4 === 0) ? "You deserve it! Treat yourself." : "Take a break – stretch it out!";
  }
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
      gentleBell.play();
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
  fadeOutAmbient();
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
    saveToLocal();
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

let audioContext, currentSource, gainNode;
const gentleBell = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_5fa3e3c5a7.mp3?filename=soft-bell-6555.mp3");
const audioFiles = {
  birds: "/assets/audio/park_birds.mp3",
  morning: "/assets/audio/morning_park.mp3",
  river: "/assets/audio/mountain_river.mp3",
  lofi: "/assets/audio/summer_lofi.mp3",
  jazz: "/assets/audio/jazz_brush.mp3",
  piano: "/assets/audio/piano.mp3",
  keyboard: "/assets/audio/keyboard.mp3"
};

function fadeOutAmbient() {
  if (gainNode && currentSource) {
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.0);
    setTimeout(() => {
      try { currentSource.stop(); } catch (e) {}
      currentSource.disconnect();
      gainNode.disconnect();
      currentSource = null;
      gainNode = null;
    }, 1100);
  }
}

function changeAmbient(mood) {
  if (!mood || !audioFiles[mood]) {
    fadeOutAmbient();  // 음악 끄기는 여전히 부드럽게
    return;
  }
  
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  
  // 음악 전환할 때만 즉시 정리 (fadeOutAmbient 사용하지 않음)
  if (currentSource) {
    try { 
      currentSource.stop(); 
      currentSource.disconnect();
    } catch (e) {}
  }
  if (gainNode) {
    try {
      gainNode.disconnect();
    } catch (e) {}
  }
  currentSource = null;
  gainNode = null;

  // 새 오디오 바로 시작
  fetch(audioFiles[mood])
    .then(res => res.arrayBuffer())
    .then(data => audioContext.decodeAudioData(data))
    .then(buffer => {
      const source = audioContext.createBufferSource();
      const gain = audioContext.createGain();
      source.buffer = buffer;
      source.loop = true;
      source.connect(gain);
      gain.connect(audioContext.destination);
      gain.gain.setValueAtTime(0.7, audioContext.currentTime);
      source.start(0);
      currentSource = source;
      gainNode = gain;
    })
    .catch(err => console.error("Audio error:", err));
}
function saveToLocal() {
  localStorage.setItem("goals", document.getElementById("goalList").innerHTML);
  localStorage.setItem("log", JSON.stringify(log));
}

function loadFromLocal() {
  const savedGoals = localStorage.getItem("goals");
  if (savedGoals) document.getElementById("goalList").innerHTML = savedGoals;
  const savedLog = localStorage.getItem("log");
  if (savedLog) {
    log = JSON.parse(savedLog);
    renderLog();
  }
}

window.onload = () => {
  updateDisplay();
  updateStatus();
  loadFromLocal();
};
