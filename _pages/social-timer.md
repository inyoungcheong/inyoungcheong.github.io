title: Social Pomodoro Timer
description: 
permalink: /social-timer/
---

<!-- Firebase App (core SDK) -->
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"></script>

<!-- Firestore SDK -->
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"></script>

<script>
  const firebaseConfig = {
    apiKey: "AIzaSyAW3sw__h-YyGOBowZULt2iZ59CP8KkU34",
    authDomain: "social-timer-a2315.firebaseapp.com",
    projectId: "social-timer-a2315",
    storageBucket: "social-timer-a2315.firebasestorage.app",
    messagingSenderId: "68840014890",
    appId: "1:68840014890:web:ac1b634ab00b41622eef53"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
</script>

<script>
  // Test write to Firestore
  db.collection("sessions").doc("testSession1")
    .collection("participants").doc("user123")
    .set({
      moodEmoji: "😊",
      reflection1: "Finish my sh**ty first draft",
      reflection2: "Snack breaks becoming snack meals"
    })
    .then(() => {
      console.log("✅ Firestore write success!");
    })
    .catch((error) => {
      console.error("❌ Firestore write error:", error);
    });
</script>
