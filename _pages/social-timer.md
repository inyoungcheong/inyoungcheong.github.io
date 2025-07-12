---
layout: page
title: Social Pomodoro Timer
permalink: /social-timer/
description: A pomodoro timer for friends.  
no_title: true
no_description: true
---

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
  document.addEventListener("DOMContentLoaded", function () {
    db.collection("sessions").doc("testSession1")
      .collection("participants").doc("user123")
      .set({
        moodEmoji: "😊",
        reflection1: "Finish my sh**ty first draft",
        reflection2: "Snack breaks becoming snack meals",
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        console.log("✅ Firestore write success!");
      })
      .catch((error) => {
        console.error("❌ Firestore write error:", error);
      });
  });
</script>

