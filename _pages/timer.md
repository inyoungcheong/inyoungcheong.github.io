---
layout: page
title: productivity
permalink: /productivity/
description: I created this interactive timer as a personal motivation tool, inspired by insights from Howard S. Becker's <Writing for Social Scientists>. When life hands you tangerines, remember that the sky is vast enough for all our dreams! Remember your frustration today is proof of how deeply you care about your goals.
nav: true
nav_order: 5
---

<style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .productivity-app {
            font-family: 'Comic Sans MS', cursive, sans-serif;
            background: linear-gradient(135deg, #ffeaa7, #fab1a0);
            min-height: 100vh;
            padding: 20px;
            color: #2d3436;
            margin: -20px -15px;
        }

        .container-app {
            max-width: 1200px;
            margin: 0 auto;
        }

        .app-title {
            text-align: center;
            font-size: 2.5em;
            color: #e17055;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }

        .section {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 20px;
            padding: 25px;
            margin-bottom: 25px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .section h2 {
            color: #e17055;
            margin-bottom: 20px;
            font-size: 1.8em;
        }

        /* Goal Setting */
        .goal-input {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
            align-items: center;
        }

        .goal-input input {
            flex: 1;
            padding: 12px;
            border: 2px solid #fab1a0;
            border-radius: 25px;
            font-size: 16px;
            background: rgba(255, 255, 255, 0.8);
        }

        .goal-input select {
            padding: 12px;
            border: 2px solid #fab1a0;
            border-radius: 25px;
            background: rgba(255, 255, 255, 0.8);
            cursor: pointer;
        }

        .add-goals-btn {
            background: #e17055;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 15px;
        }

        .add-goals-btn:hover {
            background: #d63031;
            transform: translateY(-2px);
        }

        .post-its {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            margin-top: 20px;
        }

        .post-it {
            background: #fdcb6e;
            padding: 15px;
            border-radius: 10px;
            min-width: 200px;
            transform: rotate(-2deg);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            font-size: 16px;
            line-height: 1.4;
            position: relative;
        }

        .post-it:nth-child(2n) {
            background: #fd79a8;
            transform: rotate(1deg);
        }

        .post-it:nth-child(3n) {
            background: #a29bfe;
            transform: rotate(-1deg);
        }

        .post-it::before {
            content: "📌";
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 20px;
        }

        /* Timer */
        .timer-display {
            text-align: center;
            font-size: 4em;
            color: #e17055;
            margin: 20px 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        .timer-controls {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .timer-btn {
            background: #74b9ff;
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .timer-btn:hover {
            background: #0984e3;
            transform: translateY(-2px);
        }

        .timer-btn.active {
            background: #e17055;
        }

        .timer-status {
            text-align: center;
            font-size: 1.5em;
            margin: 15px 0;
            color: #e17055;
        }

        /* Tangerine & Baskets */
        .game-area {
            position: relative;
            min-height: 300px;
            background: linear-gradient(to bottom, #74b9ff, #0984e3);
            border-radius: 15px;
            padding: 20px;
            margin-top: 20px;
        }

        .tangerine {
            position: absolute;
            font-size: 40px;
            cursor: grab;
            transition: all 0.3s ease;
            z-index: 10;
        }

        .tangerine:active {
            cursor: grabbing;
        }

        .tangerine.falling {
            animation: fall 2s ease-in-out;
        }

        @keyframes fall {
            0% {
                top: 0;
                transform: rotate(0deg);
            }
            100% {
                top: 100px;
                transform: rotate(360deg);
            }
        }

        .baskets {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 20px;
        }

        .basket {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            padding: 20px;
            min-width: 150px;
            text-align: center;
            border: 3px dashed #fab1a0;
            transition: all 0.3s ease;
        }

        .basket:hover {
            background: rgba(255, 255, 255, 1);
            transform: translateY(-5px);
        }

        .basket.drag-over {
            background: rgba(116, 185, 255, 0.3);
            border-color: #74b9ff;
        }

        .basket-header {
            font-size: 20px;
            margin-bottom: 10px;
            color: #e17055;
        }

        .basket-count {
            font-size: 16px;
            color: #636e72;
        }

        .tangerine-count {
            font-size: 30px;
            margin: 10px 0;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.8);
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            border: 2px solid #fab1a0;
        }

        .stat-number {
            font-size: 2.5em;
            color: #e17055;
            font-weight: bold;
        }

        .stat-label {
            font-size: 1.2em;
            color: #636e72;
            margin-top: 5px;
        }

        .hidden {
            display: none;
        }
    </style>

<div class="productivity-app">
    <div class="container-app">
        <h1 class="app-title">🐱 Cat Productivity Tracker 🍊</h1>

        <!-- Goal Setting Section -->
        <div class="section">
            <h2>📝 Daily Goals</h2>
            <div class="goal-input">
                <input type="text" id="goal1" placeholder="Goal 1: What's your 'I can't believe I finally did this' moment? 🎯">
                <select id="sessions1">
                    <option value="1">1 session</option>
                    <option value="2">2 sessions</option>
                    <option value="3">3 sessions</option>
                    <option value="4">4 sessions</option>
                    <option value="5">5 sessions</option>
                </select>
            </div>
            <div class="goal-input">
                <input type="text" id="goal2" placeholder="Goal 2: What do you hate the most but have to accomplish? 🎯">
                <select id="sessions2">
                    <option value="1">1 session</option>
                    <option value="2">2 sessions</option>
                    <option value="3">3 sessions</option>
                    <option value="4">4 sessions</option>
                    <option value="5">5 sessions</option>
                </select>
            </div>
            <div class="goal-input">
                <input type="text" id="goal3" placeholder="Goal 3: What task are you secretly excited about? 🎯">
                <select id="sessions3">
                    <option value="1">1 session</option>
                    <option value="2">2 sessions</option>
                    <option value="3">3 sessions</option>
                    <option value="4">4 sessions</option>
                    <option value="5">5 sessions</option>
                </select>
            </div>
            <div class="goal-input">
                <input type="text" id="goal4" placeholder="Goal 4: What task would your future self thank you for? 🎯">
                <select id="sessions4">
                    <option value="1">1 session</option>
                    <option value="2">2 sessions</option>
                    <option value="3">3 sessions</option>
                    <option value="4">4 sessions</option>
                    <option value="5">5 sessions</option>
                </select>
            </div>
            <div class="goal-input">
                <input type="text" id="goal5" placeholder="Goal 5: What would impress your past self? 🎯">
                <select id="sessions5">
                    <option value="1">1 session</option>
                    <option value="2">2 sessions</option>
                    <option value="3">3 sessions</option>
                    <option value="4">4 sessions</option>
                    <option value="5">5 sessions</option>
                </select>
            </div>
            <button class="add-goals-btn" onclick="createPostIts()">Create Post-its! 🐱</button>
            
            <div class="post-its" id="postIts"></div>
        </div>

        <!-- Timer Section -->
        <div class="section">
            <h2>⏰ Focus Timer</h2>
            <div class="timer-display" id="timerDisplay">25:00</div>
            <div class="timer-status" id="timerStatus">Ready for focus session! 🎯</div>
            <div class="timer-controls">
                <button class="timer-btn" onclick="startTimer('focus')">Start Focus (25min)</button>
                <button class="timer-btn" onclick="startTimer('short')">Short Break (5min)</button>
                <button class="timer-btn" onclick="startTimer('long')">Long Break (10min)</button>
                <button class="timer-btn" onclick="pauseTimer()">Pause</button>
                <button class="timer-btn" onclick="resetTimer()">Reset</button>
            </div>
        </div>

        <!-- Tangerine Game Section -->
        <div class="section">
            <h2>🍊 Tangerine Collection</h2>
            <p>When a focus session ends, a tangerine falls! Drag it to the correct kitten basket. 🐱</p>
            
            <div class="game-area" id="gameArea">
                <!-- Tangerines will appear here -->
            </div>

            <div class="baskets">
                <div class="basket" id="basket1" ondrop="drop(event)" ondragover="allowDrop(event)">
                    <div class="basket-header">🐱 Kitten 1</div>
                    <div class="basket-count">Goal 1 Progress</div>
                    <div class="tangerine-count" id="count1">🍊 × 0</div>
                </div>
                <div class="basket" id="basket2" ondrop="drop(event)" ondragover="allowDrop(event)">
                    <div class="basket-header">🐱 Kitten 2</div>
                    <div class="basket-count">Goal 2 Progress</div>
                    <div class="tangerine-count" id="count2">🍊 × 0</div>
                </div>
                <div class="basket" id="basket3" ondrop="drop(event)" ondragover="allowDrop(event)">
                    <div class="basket-header">🐱 Kitten 3</div>
                    <div class="basket-count">Goal 3 Progress</div>
                    <div class="tangerine-count" id="count3">🍊 × 0</div>
                </div>
                <div class="basket" id="basket4" ondrop="drop(event)" ondragover="allowDrop(event)">
                    <div class="basket-header">🐱 Kitten 4</div>
                    <div class="basket-count">Goal 4 Progress</div>
                    <div class="tangerine-count" id="count4">🍊 × 0</div>
                </div>
                <div class="basket" id="basket5" ondrop="drop(event)" ondragover="allowDrop(event)">
                    <div class="basket-header">🐱 Kitten 5</div>
                    <div class="basket-count">Goal 5 Progress</div>
                    <div class="tangerine-count" id="count5">🍊 × 0</div>
                </div>
                <div class="basket" id="basketIdle" ondrop="drop(event)" ondragover="allowDrop(event)">
                    <div class="basket-header">😴 Idle Kitten</div>
                    <div class="basket-count">Distracted Time</div>
                    <div class="tangerine-count" id="countIdle">🍊 × 0</div>
                </div>
            </div>
        </div>

        <!-- Stats Section -->
        <div class="section">
            <h2>📊 Today's Stats</h2>
            <div class="stats">
                <div class="stat-card">
                    <div class="stat-number" id="totalSessions">0</div>
                    <div class="stat-label">Total Sessions</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="focusTime">0</div>
                    <div class="stat-label">Focus Minutes</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="tangerineCount">0</div>
                    <div class="stat-label">Tangerines Collected</div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
        // App state
        let timer = null;
        let timeLeft = 25 * 60; // 25 minutes in seconds
        let currentMode = 'focus';
        let isRunning = false;
        let goals = [];
        let stats = {
            totalSessions: 0,
            focusTime: 0,
            tangerineCount: 0,
            baskets: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, idle: 0 }
        };

        // Audio functions
        function playSound(frequency, duration, type = 'sine') {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = type;
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        }

        function playStartSound() {
            // Happy ascending chime
            playSound(523, 0.2); // C5
            setTimeout(() => playSound(659, 0.2), 100); // E5
            setTimeout(() => playSound(784, 0.3), 200); // G5
        }

        function playCompleteSound() {
            // Success fanfare
            playSound(523, 0.3); // C5
            setTimeout(() => playSound(659, 0.3), 150); // E5
            setTimeout(() => playSound(784, 0.3), 300); // G5
            setTimeout(() => playSound(1047, 0.5), 450); // C6
        }

        function playBreakSound() {
            // Gentle notification
            playSound(440, 0.4); // A4
            setTimeout(() => playSound(523, 0.4), 200); // C5
        }

        function playPauseSound() {
            // Simple pause tone
            playSound(349, 0.3); // F4
        }

        // Timer functions
        function updateDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById('timerDisplay').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        function startTimer(mode) {
            if (timer) clearInterval(timer);
            
            currentMode = mode;
            isRunning = true;
            
            // Play start sound
            playStartSound();
            
            // Set time based on mode
            switch(mode) {
                case 'focus':
                    timeLeft = 25 * 60;
                    document.getElementById('timerStatus').textContent = 'Focus time! 🎯';
                    break;
                case 'short':
                    timeLeft = 5 * 60;
                    document.getElementById('timerStatus').textContent = 'Short break! ☕';
                    break;
                case 'long':
                    timeLeft = 10 * 60;
                    document.getElementById('timerStatus').textContent = 'Long break! 🌟';
                    break;
            }
            
            updateDisplay();
            
            timer = setInterval(() => {
                timeLeft--;
                updateDisplay();
                
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    timerComplete();
                }
            }, 1000);
        }

        function pauseTimer() {
            if (timer) {
                clearInterval(timer);
                timer = null;
                isRunning = false;
                document.getElementById('timerStatus').textContent = 'Paused ⏸️';
                playPauseSound();
            }
        }

        function resetTimer() {
            if (timer) clearInterval(timer);
            timer = null;
            isRunning = false;
            timeLeft = 25 * 60;
            currentMode = 'focus';
            updateDisplay();
            document.getElementById('timerStatus').textContent = 'Ready for focus session! 🎯';
        }

        function timerComplete() {
            isRunning = false;
            
            if (currentMode === 'focus') {
                stats.totalSessions++;
                stats.focusTime += 25;
                document.getElementById('timerStatus').textContent = 'Focus session complete! 🎉';
                playCompleteSound();
                dropTangerine();
            } else {
                document.getElementById('timerStatus').textContent = 'Break complete! Ready to focus? 🐱';
                playBreakSound();
            }
            
            updateStats();
        }

        // Goal functions
        function createPostIts() {
            const postItsContainer = document.getElementById('postIts');
            postItsContainer.innerHTML = '';
            goals = [];
            
            for (let i = 1; i <= 5; i++) {
                const goalInput = document.getElementById(`goal${i}`);
                const sessionsSelect = document.getElementById(`sessions${i}`);
                
                if (goalInput.value.trim()) {
                    const goal = {
                        text: goalInput.value.trim(),
                        sessions: parseInt(sessionsSelect.value)
                    };
                    goals.push(goal);
                    
                    const postIt = document.createElement('div');
                    postIt.className = 'post-it';
                    postIt.innerHTML = `
                        <strong>🐱 Goal ${i}</strong><br>
                        ${goal.text}<br>
                        <small>Focus sessions needed: ${goal.sessions} 🍊</small>
                    `;
                    postItsContainer.appendChild(postIt);
                    
                    // Update basket labels
                    const basketHeader = document.querySelector(`#basket${i} .basket-count`);
                    if (basketHeader) {
                        basketHeader.textContent = goal.text.substring(0, 20) + (goal.text.length > 20 ? '...' : '');
                    }
                }
            }
        }

        // Tangerine functions
        function dropTangerine() {
            const gameArea = document.getElementById('gameArea');
            const tangerine = document.createElement('div');
            tangerine.className = 'tangerine falling';
            tangerine.textContent = '🍊';
            tangerine.draggable = true;
            tangerine.id = `tangerine-${Date.now()}`;
            
            // Random horizontal position
            const randomX = Math.random() * (gameArea.offsetWidth - 50);
            tangerine.style.left = randomX + 'px';
            tangerine.style.top = '0px';
            
            tangerine.addEventListener('dragstart', drag);
            gameArea.appendChild(tangerine);
            
            // Remove falling animation after it completes
            setTimeout(() => {
                tangerine.classList.remove('falling');
                tangerine.style.top = '100px';
            }, 2000);
        }

        // Drag and drop functions
        function drag(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
        }

        function allowDrop(ev) {
            ev.preventDefault();
            ev.currentTarget.classList.add('drag-over');
        }

        function drop(ev) {
            ev.preventDefault();
            ev.currentTarget.classList.remove('drag-over');
            
            const data = ev.dataTransfer.getData("text");
            const tangerine = document.getElementById(data);
            
            if (tangerine) {
                const basketId = ev.currentTarget.id;
                let basketNumber;
                
                if (basketId === 'basketIdle') {
                    basketNumber = 'idle';
                } else {
                    basketNumber = parseInt(basketId.replace('basket', ''));
                }
                
                // Update basket count
                stats.baskets[basketNumber]++;
                stats.tangerineCount++;
                
                // Update display
                const countElement = document.getElementById(`count${basketNumber === 'idle' ? 'Idle' : basketNumber}`);
                countElement.textContent = `🍊 × ${stats.baskets[basketNumber]}`;
                
                // Remove tangerine
                tangerine.remove();
                
                updateStats();
            }
        }

        // Stats functions
        function updateStats() {
            document.getElementById('totalSessions').textContent = stats.totalSessions;
            document.getElementById('focusTime').textContent = stats.focusTime;
            document.getElementById('tangerineCount').textContent = stats.tangerineCount;
        }

        // Event listeners for drag over
        document.querySelectorAll('.basket').forEach(basket => {
            basket.addEventListener('dragleave', function(ev) {
                ev.currentTarget.classList.remove('drag-over');
            });
        });

        // Initialize
        updateDisplay();
        updateStats();
</script>
