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

  .circle-timer {
    width: 220px;
    height: 220px;
    margin: 2rem auto;
    position: relative;
    background: transparent !important;
  }


  .controls {
    text-align: center;
    margin-top: 1rem;
  }
    
  #vibeBoard {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .vibe-card {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 10px;
    width: 250px;
    background: #f9f9f9;
    font-family: system-ui, sans-serif;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }

  :root {
  --accent-focus: #FF9687;   /* Pastel coral */
  --accent-break: #A3D9FF;   /* Soft blue */
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
  
  <div>
    <h2>💬 Vibe Board</h2>
    <div id="vibeBoard"></div>
  </div>



  <div id="submitPanel">
  <h3>📝 Your Notebook </h3>

  <label>Your Name:
  <input type="text" id="userNameInput" placeholder="e.g., Alex" />
  </label><br><br>

  <label>What’s one thing you’d feel proud to finish today?<br>
    <input type="text" id="reflection1Input" placeholder="Finish my sh**ty first draft" />
  </label><br><br>

  <label>What distracted you today?<br>
    <input type="text" id="reflection2Input" placeholder="Snack breaks becoming snack meals" />
  </label><br><br>

  <button onclick="submitVibe()">Submit</button>

  
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

<script src="/assets/js/timer-social.js"></script>

</body>
