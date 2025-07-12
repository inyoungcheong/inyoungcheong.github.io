---
layout: page
title: Social Pomodoro Timer
permalink: /social-timer/
description: A pomodoro timer for friends.  
no_title: true
no_description: true
---

<body>

  <style>
  body {
    font-family: 'Inter', system-ui, sans-serif;
    color: #333;
    margin: 0;
    padding: 1rem;
    line-height: 1.6;
  }

  h2, h3 {
    font-weight: 600;
    margin-top: 2rem;
  }

  .circle-timer {
    width: 240px;
    height: 240px;
    margin: 2rem auto 1rem;
    position: relative;
  }

  .main-grid {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    margin-top: 2rem;
  }

  #timerText {
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    color: #111;
  }

  .controls {
    text-align: center;
    margin-top: 1rem;
  }

  .controls button, .controls select {
    padding: 0.4rem 1rem;
    margin: 0.25rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    background: white;
    cursor: pointer;
    transition: background 0.2s;
  }

  .controls button:hover {
    background-color: #eee;
  }

  #vibeBoardContainer,
  #noteSection {
    flex: 1;
    min-height: 500px;
    background: #fff;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  }

  #vibeBoard {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 400px;
  }

  .vibe-card {
    padding: 1rem;
    border-radius: 10px;
    background-color: #f9f9f9;
    border-left: 4px solid var(--accent-focus);
    font-family: system-ui, sans-serif;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

 .note-hint {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #666;
    font-style: italic;
  }
    
  .note-section h2 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  .form-group {
    margin-bottom: 1rem;
    position: relative;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.4rem;
    font-weight: 600;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.65rem 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-family: inherit;
    font-size: 1rem;
    background-color: #fff;
    transition: border 0.2s;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    border-color: var(--accent-focus);
    outline: none;
  }

  .tag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .tag {
    background-color: var(--accent-focus);
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    font-size: 0.85rem;
    white-space: nowrap;
  }

  #addGoalInput {
    margin-top: 0.5rem;
  }

  .update-button {
    display: block;
    margin-top: 1.5rem;
    padding: 0.6rem 1.5rem;
    background: var(--accent-focus);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
  }

  .update-button:hover {
    background: #ff7968;
  }
    
  :root {
    --accent-focus: #FF9687;   /* Pastel coral */
    --accent-break: #A3D9FF;   /* Soft blue */
  }

  .section-header {
    margin-top: 2rem;
    font-size: 1.5rem;
  }

   button {
    padding: 0.6rem 1.2rem;
    background: var(--accent-focus);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1rem;
  }

 .bullet-note {
  width: 100%;
  min-height: 100px;
  padding: 0.75rem 0.9rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.6;
  background-color: #fff;
  white-space: pre-wrap;
  outline: none;
  position: relative;
}

.bullet-note:empty:before {
  content: attr(data-placeholder);
  color: #aaa;
  pointer-events: none;
  position: absolute;
  left: 0.9rem;
  top: 0.75rem;
}
.form-group.tight {
  margin-bottom: 0.8rem;
}

.bullet-note:focus {
  outline: none;
  border-color: var(--accent-focus);
}

  @media (max-width: 768px) {
    .main-grid {
      flex-direction: column;
    }
  }

  #status {
    text-align: center;
    font-size: 1.1rem;
    font-style: italic;
    margin-bottom: 1rem;
  }

  .card {
    flex: 1 1 45%;
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    font-family: system-ui, sans-serif;
    min-width: 300px;
    max-width: 600px;
  }

  .note-entry label {
    display: block;
    margin-top: 1rem;
    font-weight: bold;
  }
    
  .ambient-control {
    margin-top: 0.5rem;
    text-align: center;
    font-size: 0.95rem;
    color: #666;
  }
</style>

 <h2 id="sessionHeader">🔗 Session: ...</h2>


  <div class="status" id="status">Focus time – let's go!</div>
      
  <div class="circle-timer">
    <svg viewBox="0 0 100 100" width="200" height="200">
      <circle cx="50" cy="50" r="45" fill="none" />
      <path id="pie" fill="#FF9687" transform="rotate(0,50,50)" />
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
  </div>


<div style="text-align: center; margin-top: 1.5rem;">
  <label><strong>🎧 Ambient Sound:</strong></label>
  <select id="ambientSelect" onchange="playAmbient()">
    <option value="">No ambient</option>
    <option value="https://archive.org/download/relaxingsounds/FIRE%202%203h%20Blazing%20Fireplace.mp3">🔥 Fireplace</option>
    <option value="https://archive.org/download/relaxingsounds/Rain%207%20%28Lightest%29%208h%20DripsOnTrees-no%20thunder.mp3">🌧 Rain</option>
    <option value="https://archive.org/download/relaxingsounds/Wind%201%208h%20%28or%20Rapids%29%20Gentle%2CLowPitch%2CBrownNoise.mp3">💨 Wind</option>
    <option value="https://archive.org/download/relaxingsounds/Snowfall%20%26%20Wind%28Lite%29%2010h%20Dusk%20into%20Night-Forest.mp3">🌲 Forest</option>
  </select>

  <audio id="ambientPlayer" loop></audio>
</div>
  
<div class="main-grid">
  <!-- Vibe Board -->
  <div id="vibeBoardContainer">
    <h2>🌈 Vibe Board</h2>
    <div id="vibeBoard"></div>
    <p class="note-hint">✨ What you write in the note will appear here for everyone.</p>
  </div>

  <!-- Note Section -->
  <div id="noteSection" class="note-section">
  <h2>📝 Your Note</h2>

  <div class="form-group tight">
    <label for="nameInput">Your Name</label>
    <input type="text" id="nameInput" placeholder="e.g. Alex the 🐢" />
  </div>

  <div class="form-group tight">
    <label for="goalInput">Your Goals</label>
    <div id="goalInput" class="bullet-note" contenteditable="true" data-placeholder="• What's one thing you want to focus on?"></div>
  </div>

  <div class="form-group tight">
    <label for="barrierInput">Barrier</label>
    <input type="text" id="barrierInput" placeholder="e.g. Social media, hunger..." />
  </div>

  <div class="form-group tight">
    <label for="noteInput">Note to Self (private)</label>
    <div id="noteInput" class="bullet-note" contenteditable="true" placeholder="• Don't overthink…"></div>
  </div>

  <button class="update-button" onclick="submitVibe()">Update</button>
 </div>
</div>

    <hr><br>
  <div id="linkGenerator">
    <h3>🔗 Create a New Session</h3>
    <label>Session Name:
      <input type="text" id="newSessionInput" placeholder="e.g., writing-group" />
    </label>
    <button onclick="generateSessionLink()">Generate Link</button>
    <br><br>
    <input type="text" id="generatedLink" readonly style="width: 100%; font-size: 0.9rem;" />
  </div>

<!-- Firebase v8 SDKs -->
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>

<script>
  const firebaseConfig = {
    apiKey: "AIzaSyAW3sw__h-YyGOBowZULt2iZ59CP8KkU34",
    authDomain: "social-timer-a2315.firebaseapp.com",
    projectId: "social-timer-a2315",
    storageBucket: "social-timer-a2315.firebasestorage.app",
    messagingSenderId: "68840014890",
    appId: "1:68840014890:web:ac1b634ab00b41622eef53"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

 const sessionName = new URLSearchParams(window.location.search).get("session") || "testSession1";
document.getElementById("sessionHeader").textContent = `🔗 Session: ${sessionName}`;


  
   // Get or generate user ID
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
  
  db.collection("sessions")
  .doc(sessionName)
  .collection("participants")
  .orderBy("timestamp", "desc")
  .onSnapshot((snapshot) => {
    const container = document.getElementById("vibeBoard");
    container.innerHTML = ""; // Clear old content

    snapshot.forEach((doc) => {
      const data = doc.data();
      const goals = getGoalsFromBulletEditor();
      const barrier = data.reflection2 || "-";
      const name = data.name || "Anon";
      const animal = data.animal || "🐾";

      const card = document.createElement("div");
      card.className = "vibe-card";

      const goalTags = goals.map(g => `<span class="tag">#${g}</span>`).join(" ");

      card.innerHTML = `
        <p style="font-size: 1.5rem; margin: 0;">${animal} <strong>${name}</strong></p>
        <p><strong>🎯 </strong> ${goalTags || "-"}</p>
        <p><strong>💭 </strong> ${barrier}</p>
      `;
      container.appendChild(card);
    });
  });



  
  
  function submitVibe() {
  const name = document.getElementById("nameInput").value.trim();
  const barrier = document.getElementById("barrierInput").value.trim();
  const note = document.getElementById("noteInput").innerText.trim();  // from contenteditable
  const goals = goalList.map(g => g.trim()).filter(Boolean); // ensures no empty tags

  if (name) {
    userName = name;
    localStorage.setItem("vibeUserName", userName);
  }

  const payload = {
    animal: userAnimal,
    name: userName || "Anonymous",
    reflection1: goals.join(", "),
    reflection2: barrier,
    note: note,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };

  db.collection("sessions").doc(sessionName)
    .collection("participants").doc(userId)
    .set({
    animal: userAnimal,
    name: userName || "Anonymous",
    reflection1: goals.join("\n"),
    reflection2: barrier,
    note: note,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
    .then(() => {
      console.log("✅ Vibe submitted");

      // Clear only the inputs you'd like
      document.getElementById("barrierInput").value = "";
      document.getElementById("noteInput").value = "";
      goalList = [];
      renderGoalTags();
    })
    .catch((error) => {
      console.error("❌ Submit error:", error);
    });
}




  
  function generateSessionLink() {
  const baseName = document.getElementById("newSessionInput").value.trim() || "focus-group";
  const randomSuffix = Math.random().toString(36).substring(2, 6); // e.g., "k3d9"
  const session = `${baseName}-${randomSuffix}`;

  // Auto-fill the input for user feedback
  document.getElementById("newSessionInput").value = session;

  const base = window.location.origin + window.location.pathname;
  const fullLink = `${base}?session=${encodeURIComponent(session)}`;
  document.getElementById("generatedLink").value = fullLink;
}

  const base = window.location.origin + window.location.pathname;
  const fullLink = `${base}?session=${encodeURIComponent(session)}`;
  document.getElementById("generatedLink").value = fullLink;
}

 function playAmbient() {
  const player = document.getElementById("ambientPlayer");
  const url = document.getElementById("ambientSelect").value;
  if (url) {
    player.src = url;
    player.play();
  } else {
    player.pause();
    player.src = "";
  }
}
  
</script>

<script>


    // Save to Firestore or display in Vibe Board
    console.log({ name, goals, barrier, note });

    // You'd call Firestore update here
  }
</script>

<script>
  // Auto bullet on Enter
  document.getElementById("goalInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const sel = window.getSelection();
      const range = sel.getRangeAt(0);
      const br = document.createElement("br");
      const bullet = document.createTextNode("• ");
      range.deleteContents();
      range.insertNode(br);
      range.collapse(false);
      range.insertNode(bullet);
      
      // move caret to end
      sel.removeAllRanges();
      const newRange = document.createRange();
      newRange.setStartAfter(bullet);
      newRange.collapse(true);
      sel.addRange(newRange);
    }
  });

  // Extract goals from bullet editor
  function getGoalsFromBulletEditor() {
    const lines = document.getElementById("goalInput").innerText
      .split("\n")
      .map(line => line.replace(/^•\s*/, "").trim())
      .filter(line => line.length > 0);
    return lines;
  }
</script>


<script src="/assets/js/timer-social.js"></script>

</body>
