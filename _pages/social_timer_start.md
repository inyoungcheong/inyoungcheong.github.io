---
layout: page
title: Social Pomodoro Timer Creator 
description: You can generate a group timer and invite your friends! 
no_title: true 
no_descrition: true
permalink: /social/
---


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Start a Social Pomodoro Session</title>
  <style>
    body {
      font-family: 'Inter', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: #fffaf8;
      color: #333;
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    p {
      color: #666;
      max-width: 400px;
      text-align: center;
    }
    input {
      margin-top: 1rem;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      border-radius: 8px;
      border: 1px solid #ccc;
      width: 250px;
    }
    button {
      margin-top: 1rem;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      border: none;
      background-color: #FF9687;
      color: white;
      border-radius: 8px;
      cursor: pointer;
    }
    button:hover {
      background-color: #ff7968;
    }
  </style>
</head>
<body>

  <h1>🌱 Social Pomodoro Timer</h1>
  <p>Join or create a shared session with friends to stay focused together.</p>

  <input type="text" id="sessionInput" placeholder="Enter a session name..." />
  <button onclick="startSession()">Start Session</button>

  <script>
    function startSession() {
      const session = document.getElementById('sessionInput').value.trim();
      if (!session) {
        alert("Please enter a session name.");
        return;
      }
      window.location.href = `/social-timer/?session=${encodeURIComponent(session)}`;
    }
  </script>

</body>
</html>
