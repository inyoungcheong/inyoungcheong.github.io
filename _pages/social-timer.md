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
</style>
  
  <div>
    <h2>💬 Vibe Board</h2>
    <div id="vibeBoard"></div>
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
</script>

<script>
  db.collection("sessions")
    .doc("testSession1")
    .collection("participants")
    .onSnapshot((snapshot) => {
      let container = document.getElementById("vibeBoard");
      container.innerHTML = ""; // clear old content
      snapshot.forEach((doc) => {
        const data = doc.data();
        const div = document.createElement("div");
        div.className = "vibe-card";
        div.innerHTML = `
          <p style="font-size: 2rem; margin: 0;">${data.moodEmoji || "🙂"}</p>
          <p><strong>🎯 Goal:</strong> ${data.reflection1 || "-"}</p>
          <p><strong>💭 Distraction:</strong> ${data.reflection2 || "-"}</p>
        `;
        container.appendChild(div);
      });
    });
</script>


</body>
