// timer.js


let localTimerInterval;
let isLocalUpdate = false; // to prevent echo loop


const animalEmojis = ["🐶", "🐱", "🐰", "🦊", "🐻", "🐼", "🐯", "🦁", "🐨", "🐸", "🐵", "🐧", "🐢"];

let userId = localStorage.getItem("vibeUserId");
let userAnimal = localStorage.getItem("vibeUserAnimal");
let userName = localStorage.getItem("vibeUserName");

if (!userId) {
  userId = "user" + Math.floor(Math.random() * 100000);
  localStorage.setItem("vibeUserId", userId);
}

if (!userAnimal) {
  userAnimal = animalEmojis[Math.floor(Math.random() * animalEmojis.length)];
  localStorage.setItem("vibeUserAnimal", userAnimal);
}


function getRemainingTime(startTime, duration) {
  const elapsed = (Date.now() - startTime.toMillis()) / 1000;
  return Math.max(0, Math.floor(duration - elapsed));
}

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

function updateDisplay(remainingSeconds) {
  const minutes = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
  const seconds = (remainingSeconds % 60).toString().padStart(2, '0');
  timerText.textContent = `${minutes}:${seconds}`;
  const total = isFocus ? focusTime : (focusCount % 4 === 0 ? longBreakTime : shortBreakTime);
  drawPie(1 - (remainingSeconds / total));
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
  const duration = parseInt(document.getElementById("focusDuration").value) * 60;

  isLocalUpdate = true;
  db.collection("sessions").doc(sessionName).get().then(doc => {
    const data = doc.data()?.timer;

    // If already running, don't restart
    if (data?.status === "running") {
      isLocalUpdate = false;
      return;
    }

    // If previously paused, resume from remaining
    const startFrom = data?.status === "paused" && data.duration
      ? data.duration
      : duration;

    db.collection("sessions").doc(sessionName).set({
      timer: {
        status: "running",
        startTime: firebase.firestore.FieldValue.serverTimestamp(),
        duration: startFrom
      }
    }, { merge: true }).then(() => {
      isLocalUpdate = false;
    });
  });
}



function pauseTimer() {
  isLocalUpdate = true;

  db.collection("sessions").doc(sessionName).get().then(doc => {
    const data = doc.data()?.timer;
    if (!data) return;

    let remaining = 0;

    if (data.status === "running" && data.startTime) {
      remaining = getRemainingTime(data.startTime, data.duration);
    } else {
      remaining = data.duration || 1500;
    }

    // Save remaining time and mark as paused
    db.collection("sessions").doc(sessionName).set({
      timer: {
        status: "paused",
        duration: remaining
        // omit startTime when paused
      }
    }, { merge: true }).then(() => {
      isLocalUpdate = false;
    });
  });
}



function resetTimer() {
  const duration = parseInt(document.getElementById("focusDuration").value) * 60;
  time = duration;
  updateDisplay(duration);  // Immediate UI update
  clearInterval(localTimerInterval); // Stop ticking

  isLocalUpdate = true;
  db.collection("sessions").doc(sessionName).set({
    timer: {
      status: "stopped",
      duration: duration
    }
  }, { merge: true }).then(() => {
    isLocalUpdate = false;
  });
}


// Firestore listener for shared timer
db.collection("sessions").doc(sessionName)
  .onSnapshot((doc) => {
    const data = doc.data()?.timer;
    if (!data) return;

    const { status, startTime, duration } = data;

    if (isLocalUpdate) return;
    clearInterval(localTimerInterval);

    if (status === "running") {
      const update = () => {
        const remaining = getRemainingTime(startTime, duration);
        updateDisplay(remaining);
        if (remaining <= 0) {
          clearInterval(localTimerInterval);
          handleSessionEnd();
        }
      };
      update();
      localTimerInterval = setInterval(update, 1000);
    } else if (status === "paused") {
      const remaining = startTime ? getRemainingTime(startTime, duration) : duration;
      updateDisplay(remaining);
    } else if (status === "stopped") {
      updateDisplay(duration || 1500);
    }
  });


function handleSessionEnd() {
  gentleBell.play();

  // Update mode (focus ↔ break)
  isFocus = !isFocus;
  if (isFocus) focusCount++;

  updateStatus();

  const nextDuration = isFocus
    ? focusTime
    : (focusCount % 4 === 0 ? longBreakTime : shortBreakTime);

  isLocalUpdate = true;
  db.collection("sessions").doc(sessionName).set({
    timer: {
      status: "running",
      startTime: firebase.firestore.FieldValue.serverTimestamp(),
      duration: nextDuration
    }
  }, { merge: true }).then(() => {
    isLocalUpdate = false;
  });
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
  updateStatus();
  loadFromLocal();
};
