---
layout: page
title: group timer
permalink: /group-timer/
description: A collaborative productivity timer where up to 6 people can set goals and focus together. 
nav: false
nav_order: 6
---

<style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .group-app {
            font-family: 'Comic Sans MS', cursive, sans-serif;
            background: linear-gradient(135deg, #a8e6cf, #dcedc1);
            min-height: 100vh;
            padding: 20px;
            color: #2d3436;
            margin: -20px -15px;
        }

        .container-app {
            max-width: 1400px;
            margin: 0 auto;
        }

        .app-title {
            text-align: center;
            font-size: 2.5em;
            color: #00b894;
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
            color: #00b894;
            margin-bottom: 20px;
            font-size: 1.8em;
        }

        /* Join/Create Room */
        .room-controls {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
            flex-wrap: wrap;
            justify-content: center;
        }

        .room-input {
            padding: 12px;
            border: 2px solid #00b894;
            border-radius: 25px;
            font-size: 16px;
            background: rgba(255, 255, 255, 0.8);
            min-width: 200px;
        }

        .room-btn {
            background: #00b894;
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .room-btn:hover {
            background: #00a085;
            transform: translateY(-2px);
        }

        /* Participants Grid */
        .participants-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .participant-card {
            background: linear-gradient(135deg, #fd79a8, #fdcb6e);
            border-radius: 15px;
            padding: 20px;
            border: 3px solid #e17055;
            position: relative;
            min-height: 350px;
        }

        .participant-card:nth-child(2n) {
            background: linear-gradient(135deg, #74b9ff, #0984e3);
        }

        .participant-card:nth-child(3n) {
            background: linear-gradient(135deg, #a29bfe, #6c5ce7);
        }

        .participant-card:nth-child(4n) {
            background: linear-gradient(135deg, #fd79a8, #e84393);
        }

        .participant-card:nth-child(5n) {
            background: linear-gradient(135deg, #55efc4, #00b894);
        }

        .participant-card:nth-child(6n) {
            background: linear-gradient(135deg, #ffeaa7, #fdcb6e);
        }

        .participant-name {
            font-size: 1.4em;
            font-weight: bold;
            color: white;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            margin-bottom: 15px;
            text-align: center;
        }

        .empty-slot {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.3);
            border: 3px dashed #636e72;
            color: #636e72;
            font-size: 1.2em;
        }

        .join-input {
            margin-top: 15px;
            padding: 10px;
            border: 2px solid #636e72;
            border-radius: 20px;
            text-align: center;
            background: rgba(255, 255, 255, 0.8);
        }

        .join-btn {
            margin-top: 10px;
            padding: 8px 20px;
            background: #00b894;
            color: white;
            border: none;
            border-radius: 15px;
            cursor: pointer;
        }

        /* Goals for each participant */
        .participant-goals {
            margin-top: 15px;
        }

        .goal-mini-input {
            display: flex;
            gap: 8px;
            margin-bottom: 10px;
            align-items: center;
        }

        .goal-mini-input input {
            flex: 1;
            padding: 8px;
            border: 2px solid rgba(255,255,255,0.8);
            border-radius: 15px;
            font-size: 14px;
            background: rgba(255, 255, 255, 0.9);
        }

        .goal-mini-input select {
            padding: 8px;
            border: 2px solid rgba(255,255,255,0.8);
            border-radius: 15px;
            background: rgba(255, 255, 255, 0.9);
            font-size: 12px;
        }

        .participant-stats {
            position: absolute;
            bottom: 15px;
            left: 15px;
            right: 15px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 10px;
            padding: 10px;
            font-size: 14px;
            text-align: center;
        }

        /* Shared Timer */
        .shared-timer {
            text-align: center;
            margin: 30px 0;
        }

        .timer-display-group {
            font-size: 4em;
            color: #00b894;
            margin: 20px 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        .timer-controls-group {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .timer-btn-group {
            background: #00b894;
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .timer-btn-group:hover {
            background: #00a085;
            transform: translateY(-2px);
        }

        .timer-status-group {
            font-size: 1.5em;
            margin: 15px 0;
            color: #00b894;
        }

        /* Tangerine Collection Area */
        .group-game-area {
            background: linear-gradient(to bottom, #55efc4, #00b894);
            border-radius: 15px;
            padding: 20px;
            margin-top: 20px;
            min-height: 200px;
            position: relative;
            text-align: center;
        }

        .tangerine-group {
            position: absolute;
            font-size: 30px;
            cursor: grab;
            transition: all 0.3s ease;
            z-index: 10;
        }

        .tangerine-group.falling {
            animation: fall 2s ease-in-out;
        }

        .room-info {
            background: rgba(0, 184, 148, 0.1);
            border: 2px solid #00b894;
            border-radius: 15px;
            padding: 15px;
            margin-bottom: 20px;
            text-align: center;
        }

        .room-code {
            font-size: 1.5em;
            font-weight: bold;
            color: #00b894;
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

        .hidden {
            display: none;
        }
    </style>

<div class="group-app">
    <div class="container-app">
        <h1 class="app-title">👥 Group Productivity Timer 🍊</h1>

        <!-- Room Setup Section -->
        <div class="section">
            <h2>🏠 Join or Create a Room</h2>
            <div class="room-controls">
                <input type="text" id="roomCode" class="room-input" placeholder="Enter room code (e.g., STUDY123)">
                <button class="room-btn" onclick="joinRoom()">Join Room</button>
                <button class="room-btn" onclick="createRoom()">Create New Room</button>
            </div>
            
            <div id="roomInfo" class="room-info hidden">
                <div>Room Code: <span class="room-code" id="currentRoomCode">STUDY123</span></div>
                <div>Share this code with your friends to join!</div>
            </div>
        </div>

        <!-- Participants Section -->
        <div class="section">
            <h2>👥 Participants (0/6)</h2>
            <div class="participants-grid" id="participantsGrid">
                <!-- Participant slots will be generated here -->
            </div>
        </div>

        <!-- Shared Timer Section -->
        <div class="section">
            <h2>⏰ Group Focus Timer</h2>
            <div class="shared-timer">
                <div class="timer-display-group" id="timerDisplayGroup">25:00</div>
                <div class="timer-status-group" id="timerStatusGroup">Waiting for participants to join! 👥</div>
                <div class="timer-controls-group">
                    <button class="timer-btn-group" onclick="startGroupTimer('focus')">Start Focus (25min)</button>
                    <button class="timer-btn-group" onclick="startGroupTimer('short')">Short Break (5min)</button>
                    <button class="timer-btn-group" onclick="startGroupTimer('long')">Long Break (10min)</button>
                    <button class="timer-btn-group" onclick="pauseGroupTimer()">Pause</button>
                    <button class="timer-btn-group" onclick="resetGroupTimer()">Reset</button>
                </div>
            </div>
        </div>

        <!-- Group Tangerine Collection -->
        <div class="section">
            <h2>🍊 Group Tangerine Collection</h2>
            <p>When the group focus session ends, tangerines fall for everyone! Click to collect them for your goals. 🐱</p>
            
            <div class="group-game-area" id="groupGameArea">
                <p style="color: white; font-size: 1.2em; margin-top: 80px;">Complete a focus session to see tangerines fall! 🍊</p>
            </div>
        </div>
    </div>
</div>

<script>
        // App state
        let groupTimer = null;
        let timeLeft = 25 * 60;
        let currentMode = 'focus';
        let isRunning = false;
        let currentRoom = null;
        let participants = [];
        let maxParticipants = 6;

        // Room management
        function createRoom() {
            const roomCode = generateRoomCode();
            currentRoom = roomCode;
            document.getElementById('currentRoomCode').textContent = roomCode;
            document.getElementById('roomInfo').classList.remove('hidden');
            initializeRoom();
        }

        function joinRoom() {
            const roomCode = document.getElementById('roomCode').value.trim().toUpperCase();
            if (roomCode) {
                currentRoom = roomCode;
                document.getElementById('currentRoomCode').textContent = roomCode;
                document.getElementById('roomInfo').classList.remove('hidden');
                initializeRoom();
            } else {
                alert('Please enter a room code!');
            }
        }

        function generateRoomCode() {
            const words = ['FOCUS', 'STUDY', 'WORK', 'TEAM', 'GOAL', 'TASK'];
            const randomWord = words[Math.floor(Math.random() * words.length)];
            const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
            return randomWord + randomNum;
        }

        function initializeRoom() {
            participants = [];
            generateParticipantSlots();
            updateParticipantCount();
        }

        function generateParticipantSlots() {
            const grid = document.getElementById('participantsGrid');
            grid.innerHTML = '';

            for (let i = 0; i < maxParticipants; i++) {
                const slot = document.createElement('div');
                slot.className = 'participant-card empty-slot';
                slot.id = `slot-${i}`;
                slot.innerHTML = `
                    <div>🐱 Empty Slot ${i + 1}</div>
                    <input type="text" class="join-input" placeholder="Enter your name" id="nameInput-${i}">
                    <button class="join-btn" onclick="joinAsParticipant(${i})">Join Here!</button>
                `;
                grid.appendChild(slot);
            }
        }

        function joinAsParticipant(slotIndex) {
            const nameInput = document.getElementById(`nameInput-${slotIndex}`);
            const name = nameInput.value.trim();
            
            if (!name) {
                alert('Please enter your name!');
                return;
            }

            if (participants.some(p => p.name === name)) {
                alert('Someone is already using that name!');
                return;
            }

            const participant = {
                name: name,
                slot: slotIndex,
                goals: [],
                stats: { sessions: 0, tangerines: 0 }
            };

            participants.push(participant);
            renderParticipant(participant, slotIndex);
            updateParticipantCount();
        }

        function renderParticipant(participant, slotIndex) {
            const slot = document.getElementById(`slot-${slotIndex}`);
            slot.className = 'participant-card';
            slot.innerHTML = `
                <div class="participant-name">${participant.name} 🐱</div>
                <div class="participant-goals">
                    <div class="goal-mini-input">
                        <input type="text" placeholder="Goal 1 🎯" id="goal-${slotIndex}-1">
                        <select id="sessions-${slotIndex}-1">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div class="goal-mini-input">
                        <input type="text" placeholder="Goal 2 🎯" id="goal-${slotIndex}-2">
                        <select id="sessions-${slotIndex}-2">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div class="goal-mini-input">
                        <input type="text" placeholder="Goal 3 🎯" id="goal-${slotIndex}-3">
                        <select id="sessions-${slotIndex}-3">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>
                <div class="participant-stats">
                    Sessions: ${participant.stats.sessions} | 🍊 ${participant.stats.tangerines}
                </div>
            `;
        }

        function updateParticipantCount() {
            const count = participants.length;
            document.querySelector('.section h2').textContent = `👥 Participants (${count}/6)`;
            
            if (count > 0) {
                document.getElementById('timerStatusGroup').textContent = 'Ready to start group focus session! 🎯';
            }
        }

        // Audio functions
        function playSound(frequency, duration, type = 'sine') {
            try {
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
            } catch (e) {
                console.log('Audio not supported');
            }
        }

        function playGroupStartSound() {
            playSound(523, 0.2);
            setTimeout(() => playSound(659, 0.2), 100);
            setTimeout(() => playSound(784, 0.3), 200);
        }

        function playGroupCompleteSound() {
            playSound(523, 0.3);
            setTimeout(() => playSound(659, 0.3), 150);
            setTimeout(() => playSound(784, 0.3), 300);
            setTimeout(() => playSound(1047, 0.5), 450);
        }

        // Group timer functions
        function updateGroupDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById('timerDisplayGroup').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        function startGroupTimer(mode) {
            if (participants.length === 0) {
                alert('Need at least one participant to start the timer!');
                return;
            }

            if (groupTimer) clearInterval(groupTimer);
            
            currentMode = mode;
            isRunning = true;
            
            playGroupStartSound();
            
            switch(mode) {
                case 'focus':
                    timeLeft = 25 * 60;
                    document.getElementById('timerStatusGroup').textContent = 'Group focus time! Everyone concentrate! 🎯';
                    break;
                case 'short':
                    timeLeft = 5 * 60;
                    document.getElementById('timerStatusGroup').textContent = 'Group break time! Relax together! ☕';
                    break;
                case 'long':
                    timeLeft = 10 * 60;
                    document.getElementById('timerStatusGroup').textContent = 'Long group break! Chat and recharge! 🌟';
                    break;
            }
            
            updateGroupDisplay();
            
            groupTimer = setInterval(() => {
                timeLeft--;
                updateGroupDisplay();
                
                if (timeLeft <= 0) {
                    clearInterval(groupTimer);
                    groupTimerComplete();
                }
            }, 1000);
        }

        function pauseGroupTimer() {
            if (groupTimer) {
                clearInterval(groupTimer);
                groupTimer = null;
                isRunning = false;
                document.getElementById('timerStatusGroup').textContent = 'Group timer paused ⏸️';
            }
        }

        function resetGroupTimer() {
            if (groupTimer) clearInterval(groupTimer);
            groupTimer = null;
            isRunning = false;
            timeLeft = 25 * 60;
            currentMode = 'focus';
            updateGroupDisplay();
            document.getElementById('timerStatusGroup').textContent = 'Ready for group focus session! 🎯';
        }

        function groupTimerComplete() {
            isRunning = false;
            
            if (currentMode === 'focus') {
                document.getElementById('timerStatusGroup').textContent = 'Group focus session complete! Great job everyone! 🎉';
                playGroupCompleteSound();
                dropGroupTangerines();
                
                // Update all participants' session count
                participants.forEach(participant => {
                    participant.stats.sessions++;
                });
                updateAllParticipantStats();
            } else {
                document.getElementById('timerStatusGroup').textContent = 'Break complete! Ready for another group focus session? 🐱';
            }
        }

        function dropGroupTangerines() {
            const gameArea = document.getElementById('groupGameArea');
            gameArea.innerHTML = '<p style="color: white; font-size: 1.2em; margin-bottom: 20px;">Tangerines for everyone! Click to collect! 🍊</p>';
            
            // Create tangerines for each participant
            participants.forEach((participant, index) => {
                setTimeout(() => {
                    const tangerine = document.createElement('div');
                    tangerine.className = 'tangerine-group falling';
                    tangerine.textContent = '🍊';
                    tangerine.style.cursor = 'pointer';
                    tangerine.style.position = 'absolute';
                    tangerine.style.left = (50 + index * 60) + 'px';
                    tangerine.style.top = '0px';
                    tangerine.title = `Click to give to ${participant.name}!`;
                    
                    tangerine.onclick = () => {
                        participant.stats.tangerines++;
                        updateAllParticipantStats();
                        tangerine.remove();
                    };
                    
                    gameArea.appendChild(tangerine);
                    
                    setTimeout(() => {
                        tangerine.classList.remove('falling');
                        tangerine.style.top = '100px';
                    }, 2000);
                }, index * 200);
            });
        }

        function updateAllParticipantStats() {
            participants.forEach(participant => {
                const statsDiv = document.querySelector(`#slot-${participant.slot} .participant-stats`);
                if (statsDiv) {
                    statsDiv.textContent = `Sessions: ${participant.stats.sessions} | 🍊 ${participant.stats.tangerines}`;
                }
            });
        }

        // Initialize
        updateGroupDisplay();
        generateParticipantSlots();
</script>
