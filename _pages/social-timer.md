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
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
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

  .vibe-board .description {
    font-size: 0.95rem;
    color: #666;
    margin-top: -0.5rem;
    margin-bottom: 1rem;
  }

  .vibe-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .vibe-card {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 12px;
    background-color: #fdfdfd;
    box-shadow: 0 1px 4px rgba(0,0,0,0.03);
  }
    
  .note-entry textarea {
    height: 100px;
    resize: vertical;
  }

  #goalInputs .goal-tag {
    margin-top: 0.5rem;
  }
    
  .note-entry input,
  .note-entry textarea {
    width: 100%;
    margin-top: 0.5rem;
    padding: 0.6rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }
    
  :root {
    --accent-focus: #FF9687;   /* Pastel coral */
    --accent-break: #A3D9FF;   /* Soft blue */
  }

  .section-header {
    margin-top: 2rem;
    font-size: 1.5rem;
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
  <!-- 🎯 Note Entry Area -->
  <div class="note-entry card">
    <h2>📝 Your Notebook</h2>

    <label for="name">Your Name:</label>
    <input type="text" id="nameInput" placeholder="e.g. Libia" />

    <label>🎯 Your Goals (hashtags):</label>
    <div id="goalInputs">
      <input type="text" class="goal-tag" placeholder="#draft_no_1, #editing" />
    </div>
    <button onclick="addGoalInput()">➕ Add Goal</button>

    <label>🚧 Barrier:</label>
    <input type="text" id="barrierInput" placeholder="e.g. Slack pings, TikTok..." />

    <label>💬 Note to Self (private):</label>
    <textarea id="noteToSelf" placeholder="Don't overthink. Be grateful for what you have today..."></textarea>

    <button onclick="submitVibe()">Update Vibe</button>
  </div>

  <!-- 💬 Vibe Board -->
  <div class="vibe-board card">
    <h2>💭 Vibe Board</h2>
    <p class="description">What you write in your notebook will appear here.</p>
    <div id="vibeBoard" class="vibe-grid">
      <!-- Dynamic participant vibes will appear here -->
    </div>
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
    .onSnapshot((snapshot) => {
      let container = document.getElementById("vibeBoard");
      container.innerHTML = ""; // clear old content
      snapshot.forEach((doc) => {
        const data = doc.data();
        const div = document.createElement("div");
        div.className = "vibe-card";
        div.innerHTML = `
          <p style="font-size: 1.5rem; margin: 0;">${data.animal || "🐾"} <strong>${data.name || "Anon"}</strong></p>
          <p><strong>🎯 Goal:</strong> ${data.reflection1 || "-"}</p>
          <p><strong>💭 Barrier:</strong> ${data.reflection2 || "-"}</p>
        `;
        container.appendChild(div);
      });
    });


  
  
  function submitVibe() {
  const r1 = document.getElementById("reflection1Input").value;
  const r2 = document.getElementById("reflection2Input").value;

  // Get and store name input
  const nameInput = document.getElementById("userNameInput");
  if (nameInput) {
    const name = nameInput.value.trim();
    if (name) {
      userName = name;
      localStorage.setItem("vibeUserName", userName);
    }
  }

  db.collection("sessions").doc(sessionName)
    .collection("participants").doc(userId)
    .set({
      animal: userAnimal,
      name: userName || "Anonymous",
      reflection1: r1,
      reflection2: r2,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log("✅ Vibe submitted");
    })
    .catch((error) => {
      console.error("❌ Submit error:", error);
    });
}


  function generateSessionLink() {
  const session = document.getElementById("newSessionInput").value.trim();
  if (!session) {
    alert("Please enter a session name.");
    return;
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
  function addGoalInput() {
    const container = document.getElementById("goalInputs");
    const input = document.createElement("input");
    input.type = "text";
    input.className = "goal-tag";
    input.placeholder = "#yourGoal";
    container.appendChild(input);
  }

  function submitVibe() {
    const name = document.getElementById("nameInput").value.trim();
    const goalInputs = document.querySelectorAll(".goal-tag");
    const barrier = document.getElementById("barrierInput").value.trim();
    const note = document.getElementById("noteToSelf").value.trim();

    const goals = Array.from(goalInputs).map(input => input.value.trim()).filter(Boolean);

    // Save to Firestore or display in Vibe Board
    console.log({ name, goals, barrier, note });

    // You'd call Firestore update here
  }
</script>


<script src="/assets/js/timer-social.js"></script>

</body>
